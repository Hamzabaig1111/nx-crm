import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { KeyIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state to toggle password visibility
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://crm-lms-sever.vercel.app/api/auth/login",
        {
          agent_username: username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const {
        token,
        agentusename,
        userImage,
        userId,
        is_superadmin,
        is_employee,
        is_Accountant,
        agentBranch,
      } = response.data;
      console.log(agentBranch);
      // Save token to local storage or session storage as needed
      localStorage.setItem("token", token);
      localStorage.setItem("username", agentusename);
      localStorage.setItem("userimage", userImage);
      localStorage.setItem("userId", userId);
      localStorage.setItem("is_superadmin", is_superadmin);
      localStorage.setItem("is_employee", is_employee);
      localStorage.setItem("is_Accountant", is_Accountant);
      localStorage.setItem("agentBranch", agentBranch);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("login failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="LoginContainer">
      <div className="loginFormContainer">
        <div className="imageContainer">
          <img src="/assets/logp.png" alt="" />
        </div>
        <form className="loginform" onSubmit={handleLogin}>
          <div className="inputLoginItem">
            <label htmlFor="username">UserName:</label>
            <input
              type="text"
              placeholder="user0011"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputLoginItem">
            <label htmlFor="username">Password:</label>
            <div className="passwordInputContainer">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*****"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <EyeSlashIcon
                  className="mykeyIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <KeyIcon
                  className="mykeyIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          {isLoading ? (
            <div className="myLoader_container">
              <div className="myLoader"></div>
            </div>
          ) : (
            <div className="inputLoginItem">
              <button className="loginbutton" type="submit">
                Login
              </button>
            </div>
          )}

          {error && <div className="error">{error}</div>}
          <div className="inputLoginItem"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
