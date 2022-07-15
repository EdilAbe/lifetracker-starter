import * as React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage({ message = "" }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?.email) navigate("/activity"), [];
  });

  return <LoginForm />;
}
