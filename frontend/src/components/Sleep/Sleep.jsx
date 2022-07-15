import { Link } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import "./Sleep.css";

export default function Sleep() {
  return (
    <div className="Sleep">
      <UserHeader sectionName="Sleep" />

      <div className="Sleep-area">
        <div className="title">
          <Link to="/sleep/log">Log Sleep</Link>
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
