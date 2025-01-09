import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const Password = ({ password, setPassword }) => {
  const [isShowPassWord, setIsShowPassWord] = useState(false);
  return (
    <div className="flex relative items-center">
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-box w-full"
        type={isShowPassWord ? "text" : "password"}
        placeholder="password"
      />
      {isShowPassWord ? (
        <FaRegEye
          onClick={() => setIsShowPassWord(!isShowPassWord)}
          className="absolute right-5 cursor-pointer"
        />
      ) : (
        <FaRegEyeSlash
          onClick={() => setIsShowPassWord(!isShowPassWord)}
          className="absolute right-5 cursor-pointer"
        />
      )}
    </div>
  );
};

export default Password;
