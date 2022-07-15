import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
import { useAuthContext } from ".././contexts/auth";

export const ActivityContext = createContext();

export function useActivityContext() {
  console.log("useActivityContext is called");
  return useContext(ActivityContext);
}

export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = useState({});
  const [initialized, setInitialized] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { user, setUser, isAuthorized } = useAuthContext();

  const variables = {
    activity,
    setActivity,
    initialized,
    setInitialized,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  useEffect(() => {
    const fetchSummaryStatistics = async () => {
      const { data, error } = await ApiClient.calculateSummaryStats();
      if (data) {
        setActivity(data);
      }
      if (error) setError(error);
    };

    if (user?.email) {
      setIsLoading(true);
      setError(null);
      fetchSummaryStatistics();
    }
    setIsLoading(false);
    setInitialized(true);
  }, [user]);

  return (
    <ActivityContext.Provider value={variables}>
      {" "}
      {children}{" "}
    </ActivityContext.Provider>
  );
};
