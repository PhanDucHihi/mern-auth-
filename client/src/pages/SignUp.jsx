import React, { useState } from "react";
import { Link } from "react-router-dom";
import Password from "../components/input/password";

const SignUp = () => {
  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <div className="flex flex-col gap-4">
        <input className="input-box" type="text" placeholder="username" />
        <input className="input-box" type="email" placeholder="email" />
        <Password />
        <button className="button-primary">SIGN UP</button>
        <button className="button-danger">CONTINUE WITH GOOGLE</button>
        <div>
          Have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-400 hover:text-blue-600 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
