import * as React from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ element }) {
  if (initialized && user?.email) {
    return element;
  } else {
    return <AccessForbidden />;
  }
}
