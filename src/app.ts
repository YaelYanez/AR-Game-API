import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.config";
import { AuthRoutes } from "./api/routes/auth.route";
import { GameRoundRoutes } from "./api/routes/game-round.route";
import { NODE_ENV, PORT } from "./config/env.config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

if (NODE_ENV === "development") app.use(morgan("dev"));

connectDB();

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/gameRound", GameRoundRoutes);

app.listen(PORT || 80, () => {
  console.log(
    colors.blue.bold(`Server running as ${NODE_ENV} on port: ${PORT}`)
  );
});
