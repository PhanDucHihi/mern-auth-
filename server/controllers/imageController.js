import { BadRequestError, NotFoundError } from "../errors/index.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const uploadImage = (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No image uploaded");
  }
  const imageUrl = `http:://localhost:3000/uploads/${req.file.filename}`;
  res.status(200).json({ msg: imageUrl });
};
const deleteImage = (req, res) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    throw new BadRequestError("ImageUrl parameter is required");
  }
  try {
    const filename = path.basename(imageUrl);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filepath = path.join(__dirname, "..", "uploads", filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(200).json({ msg: "Image deleted successfully" });
    } else {
      throw new NotFoundError("Image not found");
    }
  } catch (error) {
    throw new Error();
  }
};

export { uploadImage, deleteImage };
