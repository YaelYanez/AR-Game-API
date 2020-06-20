import mongoose, { Schema, model } from "mongoose";
import bycript from "bcryptjs";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  hashPassword: Function;
  authenticate: Function;
}

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  highestScore: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.hashPassword = (password: string) => {
  return bycript.hashSync(password, 10);
};

UserSchema.methods.authenticate = function (password: string) {
  return bycript.compareSync(password, this.password);
};

UserSchema.pre<IUser>("save", function (next) {
  if (this.password) this.password = this.hashPassword(this.password);
  next();
});

const userModel = model<IUser>("User", UserSchema);
export default userModel;
