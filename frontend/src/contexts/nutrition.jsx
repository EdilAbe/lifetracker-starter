import * as React from "react";
import ApiClient from "../services/apiClient";
import { useAuthContext } from "./auth";

const NutritionContext = React.createContext();

export function NutritionContextProvider({ children }) {
  const [nutritions, setNutritions] = React.useState([]);
  const [initialized, setInitialized] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [addedNutrition, setaddedNutrition] = React.useState(false);

  const { user } = useAuthContext();

  React.useEffect(() => {
    const fetchNutrition = async () => {
      const { data, error } = await ApiClient.fetchNutritionForUser();
      console.log("nutritions data in nutrition context:", data);
      if (data?.nutritions) {
        setNutritions([...data.nutritions]);
        console.log(nutritions);
        setError(null);
      }
      if (error) setError(error);
    };

    if (user?.email) {
      setIsLoading(true);
      setError(null);
      fetchNutrition();
    }
    setIsLoading(false);
    setInitialized(true);
  }, [addedNutrition]);

  const addNutrition = async (nutritionForm) => {
    const { data, error } = await ApiClient.createNutrition(nutritionForm);
    console.log("Added nutrition data is:", data);
    if (error) setError(error);
    if (data) setaddedNutrition(true);
  };

  return (
    <NutritionContext.Provider
      value={{
        nutritions,
        setNutritions,
        initialized,
        setInitialized,
        isLoading,
        setIsLoading,
        error,
        setError,
        addedNutrition,
        setaddedNutrition,
        addNutrition,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export const useNutritionContext = () => {
  return React.useContext(NutritionContext);
};
