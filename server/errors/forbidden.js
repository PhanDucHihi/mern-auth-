import CustomAPIError from "./custom_api.js";
import { StatusCodes } from "http-status-codes";

class ForBiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
export default ForBiddenError;
