import express from "express";
import upload from "../multer.js";
import { deleteImage, uploadImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/image-upload", upload.single("image"), uploadImage);
router.delete("/delete-image", deleteImage);

export default router;
