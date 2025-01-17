import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { BadRequestError, Unauthenticated } from "../errors/index.js";
import User from "../models/UserModal.js";

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const foundUser = await User.findOne({
    $or: [{ username }, { email }, { password }],
  });
  if (foundUser) {
    throw new BadRequestError("Username, email, or password already existed");
  }
  const newUser = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ msg: "Created successfully" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Invalid credentials1");
  }
  const isMatch = await user.comparePW(password);
  if (!isMatch) {
    throw new Unauthenticated("Invalid credentials2");
  }
  const accessToken = user.createJWT();
  const refreshToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  user.refreshToken = refreshToken;
  await user.save();
  const userData = {
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl,
    _id: user._id,
  };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 5 * 60 * 1000,
  });

  res.json({ userData, accessToken });
};

export { signUp, signIn };
