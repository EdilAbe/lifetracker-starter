import * as React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginPage.css";
import { useAuthContext } from "../../contexts/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext;

  React.useEffect(() => {
    if (user?.email) navigate("/activity"), [user];
  });

  return <LoginForm />;
}
