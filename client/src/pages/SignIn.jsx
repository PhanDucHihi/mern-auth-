import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/input/password";
import axios, { axiosPrivate } from "../api/axios.js";
import validateEmail from "../utils/validateEmail.js";
import { useGlobalAuthContext } from "../context/AuthProvider.jsx";
import useRefreshToken from "../hooks/useRefreshToken.js";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice.js";

const SignIn = () => {
  const { auth, setAuth } = useGlobalAuthContext();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please provide a valid email address");
      return;
    }
    if (!password) {
      setError("Please provide password");
      return;
    }

    try {
      const response = await axios.post(
        "/auth/sign-in",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.data.accessToken;
      setAuth({ email, accessToken });
      dispatch(getUser(response.data.userData));
      // console.log(auth);
      navigate("/home");
    } catch (error) {
      // console.log(error);

      setError(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          SIGN IN
        </button>
        <div>
          Create an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-400 hover:text-blue-600 font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
