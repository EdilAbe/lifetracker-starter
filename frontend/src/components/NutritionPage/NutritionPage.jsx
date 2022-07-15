import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import "./NutritionPage.css";
import NutritionOverview from "../NutritionOverview/NutritionOverview";
import NutritionNew from "../NutritionNew/NutritionNew";
import NutritionDetail from "../NutritionDetail/NutritionDetail";
import { NutritionContextProvider } from "../../contexts/nutrition";
import { AuthContextProvider } from "../../contexts/auth";
import UserHeader from "../UserHeader/UserHeader";
import NutritionForm from "../NutritionForm/NutritionForm";

export default function NutritionPage() {
  return (
    <div className="nutrition-page">
      <AuthContextProvider>
        <UserHeader sectionName="Nutrition" />
        <div className="nutrition-page-container">
          <Routes>
            <Route path="/" element={<NutritionOverview />} />
            <Route path="/create" element={<NutritionNew />} />
            <Route path="/id/:nutritionId" element={<NutritionDetail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </div>
  );
}
