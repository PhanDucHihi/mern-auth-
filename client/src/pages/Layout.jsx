import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="w-full bg-stone-300 mb-8">
        <div className="flex justify-between container mx-auto px-3 py-3">
          <Link to="/" className="text-xl font-bold">
            Auth App
          </Link>
          <div className="flex gap-2 font-medium">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/sign-in">Sign in</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
