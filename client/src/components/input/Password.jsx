import React, { useState } from "react";

const Password = () => {
  const [isShowPassWord, setIsShowPassWord] = useState(false);
  return (
    <div>
      <input className="input-box" type="password" placeholder="password" />
    </div>
  );
};

export default Password;
