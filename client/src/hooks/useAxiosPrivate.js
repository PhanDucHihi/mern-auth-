import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useGlobalAuthContext } from "../context/AuthProvider";

const useAxiosPrivate = () => {
  const { auth, setAuth } = useGlobalAuthContext();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      //access Token expired
      async (error) => {
        const preRequest = error?.config;
        if (error?.response?.status === 403 && !preRequest?.sent) {
          preRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          if (!newAccessToken) {
            setAuth({});
            return;
          }
          preRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(preRequest); //retry
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
