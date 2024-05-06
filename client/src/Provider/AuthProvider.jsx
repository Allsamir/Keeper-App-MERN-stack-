import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../config/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "Successfully Logout",
          icon: "success",
          confirmButtonText: "Close",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(
            "https://server-dun-pi.vercel.app/jwt",
            { email: currentUser.email },
            { withCredentials: true },
          )
          .then()
          .catch((err) => console.error(err));
      } else {
        axios
          .post(
            "https://server-dun-pi.vercel.app/logout",
            {},
            { withCredentials: true },
          )
          .then()
          .catch((err) => console.error(err));
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    createUser,
    loading,
    logOut,
    login,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
