import mongoose from "mongoose";
import jwb from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {};

UserSchema.methods.comparePW = async function (candidatePW) {
  const isMatch = await bcrypt.compare(candidatePW, this.password);
  return isMatch;
};

export default mongoose.model("Users", UserSchema);
