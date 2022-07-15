import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
import { useAuthContext } from "./auth";

export const NutritionContext = createContext();

export function useNutritionContext() {
  return useContext(NutritionContext);
}

export const NutritionContextProvider = ({ children }) => {
  const globals = useAuthContext();
  const isLoggedIn = globals.isLoggedIn;

  const [nutritions, setNutritions] = useState([]);
  const [initialized, setInitialized] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchNutritions = async () => {
      const { data, error } = await ApiClient.getNutritions();
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
        isLoading,
        setIsLoading,
        nutritions,
        setNutritions,
        isLoggedIn,
        setError,
      }}
    >
      {" "}
      {children}{" "}
    </NutritionContext.Provider>
  );
};
