import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/input/password";
import axios from "../api/axios.js";
import validateEmail from "../utils/validateEmail.js";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Please provide username");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please provide a valid email address");
      return;
    }
    if (!password) {
      setError("Please provide password");
      return;
    }

    try {
      const response = await axios.post("/auth/sign-up", {
        username,
        email,
        password,
      });
      if (response && response.data.msg) {
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="input-box"
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
          type="email"
          placeholder="email"
        />
        <Password password={password} setPassword={setPassword} />
        {error && <p className="text-sm text-red-500 pb-1">{error}</p>}
        <button type="submit" className="button-primary">
          SIGN UP
        </button>
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
      </form>
    </div>
  );
};

export default SignUp;
