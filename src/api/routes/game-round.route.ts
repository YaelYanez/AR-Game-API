import { Router } from "express";
import { startGame, endGame } from "../controllers/game-round.controller";

const router = Router();

router.route("/startGame").post(startGame);
router.route("/endGame").post(endGame);

export { router as GameRoundRoutes };
