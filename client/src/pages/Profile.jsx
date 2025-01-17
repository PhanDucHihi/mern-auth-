import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSelector from "../components/input/ImageSelector";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { getUser } from "../redux/slices/userSlice.js";
import imageUpload from "../utils/handleUploadImage.js";
import axios from "../api/axios.js";
import { useGlobalAuthContext } from "../context/AuthProvider.jsx";

const Profile = () => {
  const { setAuth } = useGlobalAuthContext();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(
    (currentUser && currentUser.username) || ""
  );
  const [email, setEmail] = useState((currentUser && currentUser.email) || "");
  const [image, setImage] = useState(
    (currentUser && currentUser.imageUrl) || null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      let imageUrl = "";
      if (typeof image === "object") {
        imageUrl = await imageUpload(image);
        handleDeleteImg(currentUser.imageUrl);
      } else {
        imageUrl = image;
      }
      const response = await axiosPrivate.patch(
        `/user/updateInfo/${currentUser._id}`,
        {
          username,
          email,
          imageUrl: imageUrl,
        }
      );
      dispatch(getUser(response.data.updatedUser));
      toast.success("Updated SuccessFully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImg = async (imageUrl) => {
    try {
      const resposne = await axiosPrivate.delete("/avatar/delete-image", {
        params: {
          imageUrl: imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      setAuth({});
      await axios.get("/auth/logout", { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Update</h1>
      <ImageSelector image={image} setImage={setImage} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-box"
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
          type="email"
          placeholder="email"
        />
        <p
          onClick={handleLogOut}
          className=" text-red-400 cursor-pointer text-end"
        >
          LogOut
        </p>
        <button type="submit" className="button-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
