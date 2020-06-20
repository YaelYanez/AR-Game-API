import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

let path;

switch (process.env.NODE_ENV) {
  case "production":
    path = resolve(__dirname, "../../src/env/.env.production");
    break;
  default:
    path = resolve(__dirname, "../../src/env/.env.development");
    break;
}

dotenv.config({ path });

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
