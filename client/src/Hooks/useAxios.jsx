import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxios = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      function (response) {
        console.log(response);
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Unauthorized",
            icon: "error",
            confirmButtonText: "Close",
          }).then(() => {
            logOut();
          });
        } else if (error.response.status === 403) {
          Swal.fire({
            title: "Forbidden access",
            icon: "error",
            confirmButtonText: "Close",
          }).then(() => {
            logOut();
          });
        }
      },
    );
  }, [logOut]);
  return axiosSecure;
};

export default useAxios;
