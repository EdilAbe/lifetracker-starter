import * as React from "react";
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import "./ActivityPage.css";
import { useActivityContext } from "../../contexts/activity";
import { useAuthContext } from "../../contexts/auth";

export default function ActivityPage() {
  const { activity, isProcessing } = useActivityContext();

  return (
    <div className="activity-page">
      {isProcessing ? (
        <Loading />
      ) : (
        <ActivityFeed
          totalCaloriesPerDay={activity?.nutrition?.calories?.perDay}
          avgCaloriesPerCategory={activity?.nutrition?.calories?.perCategory}
        />
      )}
    </div>
  );
}
