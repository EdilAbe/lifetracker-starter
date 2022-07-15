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
import { AuthContextProvider } from "../../contexts/auth";
import { NutritionContextProvider } from "../../contexts/nutrition";
import { ActivityContextProvider } from "../../contexts/activity";
import { useAuthContext } from "../../contexts/auth";

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <AuthContextProvider>
            <NutritionContextProvider>
              <ActivityContextProvider>
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
                    element={<ProtectedRoute element={<NutritionPage />} />}
                  />
                </Routes>
              </ActivityContextProvider>
            </NutritionContextProvider>
          </AuthContextProvider>{" "}
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}
