import React from "react";
import { useGlobalAuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { auth, setAuth } = useGlobalAuthContext();
  return auth?.accessToken ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default RequireAuth;
