import { Response, Request } from "express";
import userModel from "../models/Users";

const getUsersHighScores = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find(
      {},
      { _id: 1, name: 1, highestScore: 1 }
    );

    res.status(200).json({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error, try again latter" });
  }
};

export { getUsersHighScores };
