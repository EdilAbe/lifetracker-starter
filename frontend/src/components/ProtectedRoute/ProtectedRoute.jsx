import * as React from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import "./ProtectedRoute.css";
import { useAuthContext } from "../../contexts/auth";

export default function ProtectedRoute({ element }) {
  const { isAuthorized, user } = useAuthContext();

  if (!isAuthorized && !user?.username) {
    return <AccessForbidden />;
  } else {
    return element;
  }
}
