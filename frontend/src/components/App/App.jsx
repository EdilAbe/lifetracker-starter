//import { useState } from "react";
import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Landing from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import NutritionPage from "../NutritionPage/NutritionPage";
import AuthContext from "../../contexts/auth";
import AuthContextProvider from "../../contexts/auth";
//import { ActivityContextProvider } from "../../contexts/activity";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NotFound from "../NotFound/NotFound";

// export default function AppContainer() {
//   return (
//     <AuthContextProvider>
//       <ActivityContextProvider>
//         <App />
//       </ActivityContextProvider>
//     </AuthContextProvider>
//   );
// }

export default function App() {
  const [appState, setAppState] = useState({});
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [nutritions, setNutritions] = useState([]);

  const addNutrition = (newNutrition) => {
    setNutritions((oldNutrition) => [newNutrition, ...oldNutrition]);
  };
  useEffect(() => {
    
    const fetchAuthedUser = async () => {
      const { data, error } = await ApiClient.fetchUserFromToken();
      if (error) setError(error);
      if (data?.user) {
        ApiClient.setToken(data.token);
        setIsAuthorized(true);
      }
    };

    const token = localStorage.getItem("life_tracker_token");
    if (token) {
      apiClient.setToken(token);
      fetchAuthedUser();
    } else {
      setAuthenticated(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        setAppState,
        appState,
        user,
        setUser,
        authenticated,
        setAuthenticated,
        nutritions,
      }}
    >
      <div className="app">
        <BrowserRouter>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              {/* <Route path='/activity' element={ <ProtectedRoute element={<Activity />} />} />   */}
              <Route path="*" element={<NotFound />} />
              <Route
                path="/nutrition/*"
                element={
                  <ProtectedRoute
                    element={<NutritionPage setNutritions={setNutritions} />}
                  />
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
