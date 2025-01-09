import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
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

export { signUp };
