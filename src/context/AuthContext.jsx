import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (email, otp) => {
    const data = {
      email: email,
      otp: otp,
    };
    const res = await axios.post(
      import.meta.env.VITE_BACKEND + "/api/log/checklog",
      data
    );
    let userData = res.data;
    console.log(userData);
    setCurrentUser(res.data);
    return userData;
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
