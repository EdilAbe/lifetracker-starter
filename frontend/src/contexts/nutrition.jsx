import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
import { useAuthContext } from "./auth";

export const NutritionContext = createContext();

export function useNutritionContext() {
  return useContext(NutritionContext);
}

export const NutritionContextProvider = ({ children }) => {
  const authcon = useAuthContext();
  const isAuthorized = authcon.isAuthorized;

  const [nutritions, setNutritions] = useState([]);
  const [initialized, setInitialized] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchNutritions = async () => {
      const { data, error } = await ApiClient.calculateSummaryStats();
      if (data) setNutritions(data.nutritions);
      if (error) setError(error);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchNutritions();
      console.log("nutritions", nutritions);
    }
  }, []);

  return (
    <NutritionContext.Provider
      value={{
        setIsLoading,
        isLoading,
        nutritions,
        setNutritions,
        isAuthorized,
        setError,
      }}
    >
      {" "}
      {children}{" "}
    </NutritionContext.Provider>
  );
};
