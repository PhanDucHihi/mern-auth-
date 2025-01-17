import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ImageSelector = ({ image, setImage }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState("");
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
    } else {
      console.log("No file");
    }
  };

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewImage(image);
    } else if (image) {
      setPreviewImage(URL.createObjectURL(image));
    } else {
      setPreviewImage(null);
    }

    return () => {
      if (previewImage && typeof previewImage === "string" && !image) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [image]);
  return (
    <div>
      <input
        onChange={handleImageChange}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <img
        onClick={handleClick}
        src={previewImage}
        className="img-avatar mx-auto mb-5 cursor-pointer"
      />
    </div>
  );
};

export default ImageSelector;
