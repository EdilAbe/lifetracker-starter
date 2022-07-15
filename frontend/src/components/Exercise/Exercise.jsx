import { Link } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import "./Exercise.css";

export default function Exercise() {
  return (
    <div className="Exercise">
      <UserHeader sectionName="Exercise" />

      <div className="exercise-area">
        <div className="title">
          <Link to="/exercise/create">Add Exercise</Link>
        </div>
        <br />
        <br />
        <div className="overview">
          <p> Nothing here yet! </p>
        </div>
      </div>
    </div>
  );
}
