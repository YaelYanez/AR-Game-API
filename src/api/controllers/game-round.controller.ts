import { Request, Response } from "express";
import moment from "moment";
import gameRoundModel from "../models/GameRounds";

// * START GAME
// * URL: api/v1/gameRound/startGame
// * Method: POST
// * Data params: { userId: string }
export const startGame = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const startedGame = await gameRoundModel.create({ user: userId });

    return res.status(200).json({
      success: true,
      startGameId: startedGame._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error, try again latter",
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

    const endedGame = await gameRoundModel.findOne({ _id: gameId });
    let { startTime } = endedGame!;

    const parsedStartTime = moment(Number(startTime));
    const endTime = moment();
    const gameDuration = endTime.diff(parsedStartTime, "seconds");

    await endedGame?.update({
      endTime,
      gameDuration,
      score,
    });

    return res.status(200).json({
      success: true,
      gameStatics: {
        gameDuration,
        score,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error, try again latter",
    });
  }
};
