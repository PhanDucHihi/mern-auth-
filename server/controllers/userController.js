import User from "../models/UserModal.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getUserInfo = async (req, res) => {
  const { userId } = req.user;
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    throw new NotFoundError(`Can not find user with id ${userId}`);
  }
  return res.status(StatusCodes.OK).json({ foundUser });
};

export { getUserInfo };
