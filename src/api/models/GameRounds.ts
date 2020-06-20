import mongoose, { Schema, model } from "mongoose";
import moment, { MomentInput } from "moment";

interface IGameRound extends mongoose.Document {
  startTime?: String;
  endTime?: String;
  gameDuration?: Number;
  score?: Number;
  user: string;
}

const GameRoundSchema = new Schema({
  startTime: {
    type: String,
    default: moment(),
  },
  endTime: {
    type: String,
    default: moment(),
  },
  gameDuration: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const gameRoundModel = model<IGameRound>("GameRound", GameRoundSchema);
export default gameRoundModel;
