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
import useAxios from "../Hooks/useAxios";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const secureAxios = useAxios();
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
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        secureAxios
          .post("/jwt", { email: user.email })
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
      } else {
        secureAxios
          .post("/logout", { email: null })
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
      }
    });
  }, [secureAxios]);
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
