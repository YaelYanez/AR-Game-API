import express, { Response, Request } from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.config";
import { AuthRoutes } from "./api/routes/auth.route";
import { usersRoutes } from "./api/routes/user.route";
import { GameRoundRoutes } from "./api/routes/game-round.route";
import { NODE_ENV, PORT } from "./config/env.config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

if (NODE_ENV === "development") app.use(morgan("dev"));

connectDB();

// Routes
app.get("/", (res: Response, req: Request) => {
  res
    .status(403)
    .json({ success: false, msg: "Sorry, you are not allow to access here." });
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/gameRound", GameRoundRoutes);
app.use("/api/v1/users", usersRoutes);

app.listen(PORT || 3000, () => {
  console.log(
    colors.blue.bold(`Server running as ${NODE_ENV} on port: ${PORT}`)
  );
});
