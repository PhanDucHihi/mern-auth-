import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import connectDB from "./db/connectDB.js";
// import routers
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import avatarRouter from "./routes/imageRoute.js";
//import middlewares
import notFound from "./middlewares/notFound.middleware.js";
import errorHandlerMiddleWare from "./middlewares/errrorhandler.middlerWare.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/avatar", avatarRouter);

//public access
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(notFound);
app.use(errorHandlerMiddleWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
