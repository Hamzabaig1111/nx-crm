// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ roles, children }) => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if token is present
    if (!token) {
      setIsTokenValid(false);
      navigate("/login");
      return;
    }

    try {
      // Decode the token to get user roles and check expiration
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const { exp, is_employee, is_Accountant, is_superadmin } = decodedToken;

      if (Date.now() >= exp * 1000) {
        // Token has expired
        setIsTokenValid(false);
        navigate("/login");
        return;
      }

      // Check if the user has the required roles
      const hasAccess =
        (is_superadmin && roles.includes("admin")) ||
        (is_employee && roles.includes("employee")) ||
        (is_Accountant && roles.includes("accountant"));

      if (!hasAccess) {
        setIsTokenValid(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsTokenValid(false);
      navigate("/login");
    }
  }, [navigate, roles]);

  return isTokenValid ? <>{children}</> : null;
};

export default ProtectedRoute;
