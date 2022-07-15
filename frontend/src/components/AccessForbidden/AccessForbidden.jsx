import * as React from "react";
import { Link } from "react-router-dom";
import "./AccessForbidden.css";

export default function AccessForbidden() {
  return (
    <div className="access-forbidden">
      <h1>Access Forbidden</h1>
      <p className="access-forbidden-message">
        You must be logged in to access this page. <br></br>
        <Link to="/register" className="inline-link">
          Create an account
        </Link>{" "}
        or{" "}
        <Link to="/login" className="inline-link">
          log in
        </Link>{" "}
        to access this feature and get started.
      </p>
    </div>
  );
}
