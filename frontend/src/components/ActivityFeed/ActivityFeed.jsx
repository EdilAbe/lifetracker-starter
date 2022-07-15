import { Link } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import moment from "moment";
import SummaryStat from "../SummaryStat/SummaryStat";
import "./ActivityFeed.css";
import { useAuthContext } from "../../contexts/auth";

export default function ActivityFeed({
  totalCaloriesPerDay = [],
  avgCaloriesPerCategory = [],
}) {
  const { user } = useAuthContext();
  const welcome = "Welcome " + user?.firstName + "!";

  return (
    <div className="activity-feed">
      <UserHeader sectionName={welcome} />
      <div className="activity-area">
        <div className="top">
          <div className="title">
            <h1>Activity Feed</h1>
            <div className="addLinks">
              <Link className="exercise" to="/exercise/create">
                Add Exercise
              </Link>
              <Link className="nutrition" to="/nutrition/record">
                Record Nutrition
              </Link>
              <Link className="sleep" to="/sleep/log">
                Log Sleep
              </Link>
            </div>
          </div>
        </div>
        <br />
        <div className="per-category">
          <div className="sumCard exercise">
            <h4 className="valueName">Total Exercise Minutes</h4>
          </div>

          <div className="sumCard nutrition">
            <h4 className="valueName">Average Calories Per Category</h4>
            <div className="stat-feed">
              {avgCaloriesPerCategory.map((categoryStat, index) => {
                return (
                  <SummaryStat
                    key={index}
                    stat={categoryStat.avgCaloriesPerCategory}
                    label={
                      categoryStat.avgCaloriesPerCategory != 1
                        ? "calories"
                        : "calorie"
                    }
                    substat={categoryStat.category}
                  />
                );
              })}
            </div>
          </div>

          <div className="sumCard sleep">
            <h4 className="valueName">Avg Sleep Hours</h4>
          </div>
        </div>

        <br />
        <br />

        <div className="title">
          <h4>More Stats</h4>
        </div>
        <div className="per-day">
          <div className="sumCard2 exercise">
            <h4 className="valueName">Avg Exercise Intensity</h4>
          </div>

          <div className="sumCard2 nutrition">
            <h4 className="valueName">Total Calories Per Day</h4>
            <div className="stat-feed">
              {totalCaloriesPerDay.map((dayStat, index) => {
                return (
                  <SummaryStat
                    key={index}
                    stat={dayStat.totalCaloriesPerDay}
                    label={
                      dayStat.totalCaloriesPerDay != 1 ? "calories" : "calorie"
                    }
                    substat={moment(new Date(dayStat.date)).format(
                      "MM/DD/YYYY"
                    )}
                  />
                );
              })}
            </div>
          </div>

          <div className="sumCard2 sleep">
            <h4 className="valueName">Total Hours Slept</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
