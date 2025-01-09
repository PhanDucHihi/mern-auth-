import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connectDB.js";
// import router
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use("/", userRouter);

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
