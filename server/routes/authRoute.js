import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import handleRefreshToken from "../controllers/refreshTokenController.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/refresh", handleRefreshToken);

export default router;
