import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";

export const ActivityContext = createContext();

export function useActivityContext() {
  console.log("useActivityContext is called");
  return useContext(ActivityContext);
}

export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = useState({});
  const [initialized, isInitialized] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const variables = {
    isLoading,
    activity,
  };

  useEffect(() => {
    const fetchActivity = async () => {
      const { data, error } = await ApiClient.getActivity();
      console.log("activity", data.calories);
      if (data) setActivity(data.calories);
      if (error) setError(error);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchActivity();
      console.log("activity:", activity);
      setError(null);
    }
  }, []);

  return (
    <ActivityContext.Provider value={variables}>
      {" "}
      {children}{" "}
    </ActivityContext.Provider>
  );
};
