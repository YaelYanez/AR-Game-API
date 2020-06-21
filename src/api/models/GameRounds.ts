import mongoose, { Schema, model } from "mongoose";
import moment, { duration } from "moment";

type Point = { lat: Number; lng: Number };

interface IGameRound extends mongoose.Document {
  startTime?: Number;
  endTime?: String;
  gameDuration?: Number;
  score?: Number;
  difficulty?: Number;
  startLocation: Point;
  enemiesPointsLocations: Point[];
  user: string;
  getUpdate: Function;
}

const GameRoundSchema = new Schema({
  startTime: {
    type: String,
    default: moment(),
  },
  endTime: {
    type: String,
    default: undefined,
  },
  gameDuration: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: Number,
    default: Math.floor(Math.random() * 3 + 1),
  },
  startLocation: {
    type: Object,
    required: true,
  },
  enemiesPointsLocations: {
    type: Array,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const gameRoundModel = model<IGameRound>("GameRound", GameRoundSchema);
export default gameRoundModel;
