import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../config/firebase.config";
import axios from "axios";
const provider = new GoogleAuthProvider();
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
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

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(
            "http://localhost:3000/jwt",
            { email: currentUser.email },
            { withCredentials: true },
          )
          .then()
          .catch((err) => console.error(err));
      } else {
        axios
          .post("http://localhost:3000/logout", {}, { withCredentials: true })
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
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
