import * as React from "react";
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import "./ActivityPage.css";

export default function ActivityPage() {
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
