import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/SideBar.css";
import {
  Squares2X2Icon,
  UserIcon,
  UserGroupIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import axios from "./BaseURL";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
const SideBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const checkadmin = localStorage.getItem("is_superadmin");
  console.log(checkadmin);
  const handleLogOutClick = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userimage");
      localStorage.removeItem("userId");
      localStorage.removeItem("is_superadmin");
      localStorage.removeItem("is_employee");
      localStorage.removeItem("is_Accountant");
      delete axios.defaults.headers.common["Authorization"];
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleShowSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleHideSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className={`navigationContainer ${isSidebarOpen ? "open" : ""}`}>
      <div className="logoContainer">
        <NavLink to="/">
          <img className="myImage" src="/assets/logp.png" alt="nextlogo" />
        </NavLink>
      </div>
      <div
        className="hamburgerIcon"
        onClick={isSidebarOpen ? handleHideSidebar : handleShowSidebar}
      >
        {isSidebarOpen ? (
          <Bars3Icon className="navIcon" />
        ) : (
          <XMarkIcon className="navIcon" />
        )}
      </div>
      <div className="linksContainer">
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/"
        >
          <Squares2X2Icon className="navIcon" />
          <p>Dashboard</p>
        </NavLink>

        {checkadmin === "true" ? (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "inherit",
                backgroundColor: isActive ? "#404040" : "inherit",
              };
            }}
            className="link"
            to="/agents"
          >
            <UserIcon className="navIcon" />
            <p>Agents</p>
          </NavLink>
        ) : null}
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/agentsreports"
        >
          <ChartBarIcon className="navIcon" />
          <p>Leads Section</p>
        </NavLink>
        {checkadmin === "true" ? (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "inherit",
                backgroundColor: isActive ? "#404040" : "inherit",
              };
            }}
            className="link"
            to="/customers"
          >
            <UserGroupIcon className="navIcon" />
            <p>Customers</p>
          </NavLink>
        ) : null}
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/createreporting"
        >
          <UserGroupIcon className="navIcon" />
          <p>Generate Reports</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/orders"
        >
          <NewspaperIcon className="navIcon" />
          <p>Orders</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/createlead"
        >
          <TrophyIcon className="navIcon" />
          <p>Leads</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/studentregistraction"
        >
          <Squares2X2Icon className="navIcon" />
          <p>Student Enrollment</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          to="/courses"
          className="link"
        >
          <ClipboardDocumentListIcon className="navIcon" />
          <p>Courses</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/fee"
        >
          <CurrencyDollarIcon className="navIcon" />
          <p>Fee</p>
        </NavLink>
        {checkadmin === "true" ? (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "inherit",
                backgroundColor: isActive ? "#404040" : "inherit",
              };
            }}
            className="link"
            to="/settings"
          >
            <CogIcon className="navIcon" />
            <p>Settings</p>
          </NavLink>
        ) : null}
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? "#404040" : "inherit",
            };
          }}
          className="link"
          to="/printrecepit"
        >
          <CogIcon className="navIcon" />
          <p>Print Receipt</p>
        </NavLink>
        {checkadmin === "true" ? (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "inherit",
                backgroundColor: isActive ? "#404040" : "inherit",
              };
            }}
            className="link"
            to="/usermanagement"
          >
            <AdjustmentsHorizontalIcon className="navIcon" />
            <p>Usermanagement</p>
          </NavLink>
        ) : null}

        <div
          style={{ cursor: "pointer" }}
          onClick={handleLogOutClick}
          className="link"
          to="/logoutme"
        >
          <ArrowRightOnRectangleIcon className="navIcon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
