import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    },
    imageUrl: String,
    refreshToken: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

UserSchema.methods.comparePW = async function (candidatePW) {
  const isMatch = await bcrypt.compare(candidatePW, this.password);
  return isMatch;
};

export default mongoose.model("Users", UserSchema);
