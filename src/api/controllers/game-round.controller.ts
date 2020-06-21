import { Request, Response } from "express";
import moment from "moment";
import gameRoundModel from "../models/GameRounds";
import generateRandomPoints from "../../utils/randomPointGenerator";
import userModel from "../models/Users";

// * START GAME
// * URL: api/v1/gameRound/startGame
// * Method: POST
// * Data params: { userId: string }
export const startGame = async (req: Request, res: Response) => {
  try {
    const { userId, startLocation } = req.body;

    const user = await userModel.findOne({ _id: userId });

    if (!user?.isPlaying) {
      const enemiesPointsLocations = generateRandomPoints({
        center: startLocation,
        radius: 50,
        count: 5,
      });

      await user?.updateOne({ isPlaying: true });

      const startedGame = await gameRoundModel.create({
        user: userId,
        startLocation,
        enemiesPointsLocations,
      });

      return res.status(200).json({
        success: true,
        gameId: startedGame._id,
        gameOptions: {
          difficulty: startedGame.difficulty,
          enemiesPointLocations: startedGame.enemiesPointsLocations,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "There's already a game session going on.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

// * END GAME
// * URL: api/v1/gameRound/endGame
// * Method: POST
// * Data params: { gameId: string, score: number }
export const endGame = async (req: Request, res: Response) => {
  try {
    const { gameId, score } = req.body;

    const endedGame = await gameRoundModel
      .findOne({ _id: gameId })
      .populate("user");

    // @ts-ignore
    if (endedGame?.user?.isPlaying) {
      const user = await userModel.findOneAndUpdate(
        { _id: endedGame?.user },
        { $max: { highestScore: score }, isPlaying: false },
        { new: true }
      );

      const parsedStartTime = moment(Number(endedGame?.startTime));
      const endTime = moment();
      const gameDuration = endTime.diff(parsedStartTime, "seconds");

      await endedGame?.updateOne({ endTime, gameDuration, score });

      return res.status(200).json({
        success: true,
        gameStats: { gameDuration, score, difficulty: endedGame?.difficulty },
        userStats: { highestScore: user?.highestScore },
      });
    } else {
      return res.status(409).json({
        success: false,
        msg: "There's no game session going on.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error, try again latter" });
  }
};
