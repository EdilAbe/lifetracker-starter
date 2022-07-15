import * as React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { useAuthContext } from "../../contexts/auth";

export default function RegistrationPage() {
  const { user } = useAuthContext;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?.email) navigate("/activity"), [user];
  });

  return <RegistrationForm />;
}
