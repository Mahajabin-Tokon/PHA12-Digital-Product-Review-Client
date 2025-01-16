import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://product-hunt-server-xi.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(authContext);
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("hello", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      // console.log("status", status);
      if (status === 401 || status === 403) {
        await handleLogout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
