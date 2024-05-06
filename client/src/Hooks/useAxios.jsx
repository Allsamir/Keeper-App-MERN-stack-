import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const axiosSecure = axios.create({
  baseURL: "https://server-dun-pi.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          signOut(auth).then(() => {
            Swal.fire({
              title: "Unauthorized",
              icon: "error",
              confirmButtonText: "Close",
            });
          });
        } else if (error.response.status === 403) {
          signOut(auth).then(() => {
            Swal.fire({
              title: "Unauthorized",
              icon: "error",
              confirmButtonText: "Close",
            });
          });
        }
      },
    );
  }, []);
  return axiosSecure;
};

export default useAxios;
