import React from "react";
import { useAuthenticate } from "./Authenticate";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  const location = useLocation();
  const authenticated = useAuthenticate();

  if (!authenticated.admin) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default AuthRoutes;
