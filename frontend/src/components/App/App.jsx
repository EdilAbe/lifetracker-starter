//import { useState } from "react";
import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Landing from "../LandingPage/LandingPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import NutritionPage from "../NutritionPage/NutritionPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Sleep from "../Sleep/Sleep";
import Exercise from "../Exercise/Exercise";
import NotFound from "../NotFound/NotFound";
import apiClient from "../../services/apiClient";


export default function App() {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [nutritions, setNutritions] = useState([]);
  const [isloggedIn, setisLoggedIn] = useState(false);



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
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/activity"
              element={<ProtectedRoute element={<ActivityPage />} />}
            />
            <Route
              path="/exercise"
              element={<ProtectedRoute element={<Exercise />} />}
            />
            <Route
              path="/sleep"
              element={<ProtectedRoute element={<Sleep />} />}
            />

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
  );
}
