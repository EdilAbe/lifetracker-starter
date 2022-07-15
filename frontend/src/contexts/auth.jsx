import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
import { useNutritionContext } from "./nutrition";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  // define your functions here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const variables = {
    user,
    setUser,
    error,
    setError,
    isLoggedIn,
    setIsLoggedIn,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await ApiClient.fetchUserFromToken();
      console.log(data);
      if (data) setUser(data.user);
      if (error) setError(error);
    };

    const token = localStorage.getItem("lifetracker_token");
    if (token) {
      ApiClient.setToken(token);
      setIsLoggedIn(true);
      fetchUser();
      // fetchNutritions();
      console.log("user", user);
    }
  }, []);

  function logoutUser() {
    setUser({});
    ApiClient.setToken("");
    setIsLoggedIn(false);
    console.log("user logged out");
  }

  function loginUser(response) {
    setIsLoggedIn(true);
    setUser(response);
    console.log("user", user.data);
    console.log("user logged in");
  }

  return (
    <AuthContext.Provider value={variables}> {children}</AuthContext.Provider>
  );
};
