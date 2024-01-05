import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectRoute = ({ element, isAuthenticated, redirectTo = "/login" }) => {
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default ProtectRoute;
