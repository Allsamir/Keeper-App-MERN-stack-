import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const secureAxios = axios.create({
  baseURL: "https://server-dun-pi.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  useEffect(() => {
    secureAxios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response?.status === 401) {
          signOut(auth).then(() => {
            Swal.fire({
              title: "Access expired please login again",
              icon: "error",
              confirmButtonText: "Close",
            });
          });
        }
        if (error.response?.status === 403) {
          signOut(auth).then(() => {
            Swal.fire({
              title: "This data doesn't belogs to you login again",
              icon: "error",
              confirmButtonText: "Close",
            });
          });
        }
      },
    );
  }, []);
  return secureAxios;
};

export default useAxios;
