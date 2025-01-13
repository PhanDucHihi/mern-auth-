import React from "react";

const DefaultAvatar = () => {
  const urlImageDefault = "http://localhost:3000/assets/defaultAvatar.jpg";
  return (
    <div>
      <img className="img-avatar" src={urlImageDefault} alt="" />
    </div>
  );
};

export default DefaultAvatar;
