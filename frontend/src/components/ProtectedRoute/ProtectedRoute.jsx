//import * as React from "react";
import { useAuthContext } from "../../contexts/auth";

export default function ProtectedRoute({ element }) {
  const { initialized, user } = useAuthContext();

  if (initialized && user?.email) {
    return element;
  } else {
    return "access not granted";
  }
}
