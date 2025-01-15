import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ImageSelector = () => {
  return (
    <div>
      <input type="file" accept="image/*" className="hidden" />
      <img className="img-avatar mx-auto mb-5 cursor-pointer" />
    </div>
  );
};

export default ImageSelector;
