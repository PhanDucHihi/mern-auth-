import CustomAPIError from "./custom_api.js";
import { StatusCodes } from "http-status-codes";

class Unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default Unauthenticated;
