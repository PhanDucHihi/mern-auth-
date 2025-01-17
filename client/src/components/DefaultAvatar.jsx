import React from "react";
import { useSelector } from "react-redux";

const DefaultAvatar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <img className="img-avatar" src={currentUser.imageUrl} alt="" />
    </div>
  );
};

export default DefaultAvatar;
