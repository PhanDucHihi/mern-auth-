import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json(err);
};

export default errorHandlerMiddleWare;
