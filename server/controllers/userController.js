import User from "../models/UserModal.js";
import bcrypt from "bcryptjs";
import {
  BadRequestError,
  NotFoundError,
  Unauthenticated,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getUserInfo = async (req, res) => {
  const { userId } = req.user;
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    throw new NotFoundError(`Can not find user with id ${userId}`);
  }
  const { password, refreshToken, ...rest } = foundUser._doc;
  return res.status(StatusCodes.OK).json(rest);
};

const updateUserInfo = async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;
  let { email, username, password, imageUrl } = req.body;
  if (userId !== id) {
    throw new Unauthenticated("You can update only your account1");
  }
  if (password === "" || username === "" || email === "") {
    throw new BadRequestError("username, email or password cannot be empty");
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);
  const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
    returnDocument: "after",
  });
  if (!updatedUser) {
    throw new BadRequestError(`No user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ updatedUser });
};

export { getUserInfo, updateUserInfo };
