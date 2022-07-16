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
  const [receivedNewNutrition, setReceivedNewNutrition] = React.useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchNutritions = async () => {
      const { data, error } = await ApiClient.fetchNutritionForUser();
      if (data) setNutritions(data.nutritions);
      if (error) setError(error);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchNutritions();
      console.log("nutritions", nutritions);
    }
  }, [receivedNewNutrition]);
  const addNutrition = async (nutritionForm) => {
    const { data, error } = await ApiClient.createNutrition(nutritionForm);

    if (error) setError(error);
    if (data) setReceivedNewNutrition(true);
  };

  return (
    <NutritionContext.Provider
      value={{
        setIsLoading,
        isLoading,
        addNutrition,
        nutritions,
        setNutritions,
        isAuthorized,
        setError,
        receivedNewNutrition,
        setReceivedNewNutrition,
      }}
    >
      {" "}
      {children}{" "}
    </NutritionContext.Provider>
  );
};
