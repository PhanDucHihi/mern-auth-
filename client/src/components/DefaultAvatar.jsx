import React, { useState } from "react";
import { useSelector } from "react-redux";

const DefaultAvatar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative">
      <img className="img-avatar relative" src={currentUser.imageUrl} alt="" />
    </div>
  );
};

export default DefaultAvatar;
