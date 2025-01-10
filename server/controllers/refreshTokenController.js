import { ForBiddenError, Unauthenticated } from "../errors/index.js";
import User from "../models/UserModal.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    throw new Unauthenticated("You must be logged in to access this resource");
  }
  const refreshToken = cookies.refreshToken;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    throw new ForBiddenError(
      "You do not have permisstion1 to access this resource"
    );
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      throw new ForBiddenError(
        "You do noi have permisstion2 to access this resoure"
      );
    }
    const accessToken = foundUser.createJWT();
    const userData = {
      username: foundUser.username,
      email: foundUser.email,
    };
    res.json({ userData, accessToken });
  });
};

export default handleRefreshToken;
