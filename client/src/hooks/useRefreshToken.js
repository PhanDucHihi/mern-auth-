import axios from "../api/axios";
import { useGlobalAuthContext } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useGlobalAuthContext();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(prev);
        console.log(response.data.accessToken);
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
