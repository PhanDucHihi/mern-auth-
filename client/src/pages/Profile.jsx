import React, { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.get("/user/userInfo");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
