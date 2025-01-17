import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getUserInfo, updateUserInfo } from "../controllers/userController.js";

const router = express.Router();

router.get("/userInfo", verifyJWT, getUserInfo);
router.patch("/updateInfo/:id", verifyJWT, updateUserInfo);

export default router;
