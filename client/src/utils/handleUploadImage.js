import { axiosPrivate } from "../api/axios";

const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosPrivate.post("/avatar/image-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default imageUpload;
