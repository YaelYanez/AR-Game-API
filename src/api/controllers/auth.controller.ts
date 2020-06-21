import { Request, Response } from "express";
import userModel from "../models/Users";

// * LOGIN
// * URL: /api/v1/auth/login
// * Method: POST
// * Data params: { email: string, password: string }
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loggedUser = await userModel.findOne({ email });

    if (!loggedUser?.authenticate(password))
      return res
        .status(404)
        .json({ ok: false, msg: "Check username or password" });

    return res.status(201).json({
      success: true,
      loggedUserId: loggedUser._id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error, try again latter",
    });
  }
};

// * SIGNUP
// * URL: api/v1/auth/signup
// * Method: POST
// * Data params: { name: string, email: string, password: string }
const signup = async (req: Request, res: Response) => {
  try {
    const newUser = new userModel(req.body);
    const createUser = await newUser.save();

    return res.status(200).json({ success: true, createdUser: createUser._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(
        (value: any) => value.message
      );

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else
      return res.status(500).json({
        success: false,
        error: "Server error, try again latter",
      });
  }
};

export { login, signup };
