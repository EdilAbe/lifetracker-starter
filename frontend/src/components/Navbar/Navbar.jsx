import * as React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks />
    </nav>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <Link className="logo-link" to="/">
        <img
          src="https://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"
          alt="CodePath Logo"
        />
      </Link>
    </div>
  );
}

export function NavLinks() {
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="nav-links">
      <Link to="/activity" className="nav-link">
        Activity
      </Link>
      <Link to="/exercise" className="nav-link">
        Exercise
      </Link>
      <Link to="/nutrition" className="nav-link">
        Nutrition
      </Link>
      <Link to="/sleep" className="nav-link">
        Sleep
      </Link>
      <Link to="/login" className="nav-link" id="logbtn">
        Sign in
      </Link>
      <Link to="/register" className="nav-link" id="regbtn">
        Register
      </Link>
    </div>
  );
}
