import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  // define your functions here
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await ApiClient.fetchUserFromToken();
      console.log(data);
      if (data?.user) {
        setUser(data.user);
      }
      if (error) setError(error);
    };

    const token = localStorage.getItem("lifetracker_token");
    if (token) {
      ApiClient.setToken(token);
      setIsProcessing(true);
      fetchUser();
    }
    setIsProcessing(false);
    setInitialized(true);
  }, [isAuthorized]);

  function logoutUser() {
    setIsAuthorized(false);
    setUser({});
    ApiClient.logout();
  }

  const loginUser = async (credentials) => {
    const { data, error } = await ApiClient.login(credentials);
    console.log(data, error);
    if (error) setError(error);
    if (data?.user) {
      ApiClient.setToken(data.token);
      setIsAuthorized(true);
    }
  };

  const variables = {
    user,
    setUser,
    error,
    initialized,
    setInitialized,
    setError,
    isProcessing,
    setIsProcessing,
    isAuthorized,
    setIsAuthorized,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={variables}> {children}</AuthContext.Provider>
  );
};
