import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useGlobalAuthContext } from "../context/AuthProvider";
import DefaultAvatar from "../components/DefaultAvatar";

const Layout = () => {
  const { auth, setAuth } = useGlobalAuthContext();

  return (
    <div>
      <div className="w-full bg-stone-300 mb-8">
        <div className="flex justify-between items-center container mx-auto px-8 py-3">
          <Link to="/" className="text-xl font-bold">
            Auth App
          </Link>
          <div className="flex gap-4 font-medium items-center">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            {auth?.email ? (
              <Link to="/profile">
                <DefaultAvatar />
              </Link>
            ) : (
              <Link to="/sign-in">Sign in</Link>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
