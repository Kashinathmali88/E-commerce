import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const isAuth = async () => {
    await axios
      .get(`${backendUrl}/api/user/isAuth`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isAuth();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    backendUrl,
    isAuth,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
