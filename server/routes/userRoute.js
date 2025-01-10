import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getUserInfo } from "../controllers/userController.js";

const router = express();

router.get("/userInfo", verifyJWT, getUserInfo);

export default router;
