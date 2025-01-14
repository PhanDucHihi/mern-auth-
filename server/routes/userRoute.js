import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getUserInfo, updateUserInfo } from "../controllers/userController.js";

const router = express();

router.get("/userInfo", verifyJWT, getUserInfo);
router.put("/updateInfo/:id", verifyJWT, updateUserInfo);

export default router;
