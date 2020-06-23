import { Router } from "express";
import { getUsersHighScores } from "../controllers/user.controller";

const router = Router();

router.route("/getUsersHighScores").get(getUsersHighScores);

export { router as usersRoutes };
