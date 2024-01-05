import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Remove token from local storage
       
        // Remove token from headers
       

        // Redirect to the login page
      } catch (error) {
        // Handle any logout error if needed
      }
    };

    // Call the logout function
    logout();
  }, []);

  return (
    <div className="LogoutContainer">
      <Header routeName="Logout" />
      <div className="LogoutContentContainer">Logging out...</div>
    </div>
  );
};

export default LogoutPage;
