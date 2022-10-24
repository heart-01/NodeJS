import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", process.env.MONGODB_DEBUG);
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });

export default mongoose;
