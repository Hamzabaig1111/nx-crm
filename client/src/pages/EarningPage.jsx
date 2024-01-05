import React from "react";
import Header from "../components/Header";
import "../styles/Earning.css";
import {
  BuildingOffice2Icon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const EarningPage = () => {
  const username = localStorage.getItem("username");
  return (
    <div className="FeesContainer">
      <Header routeName="Earning" />
      <div className="FeesContentContainer">
        <div className="filterContainer">
          <div className="currentUser">
            <span>{username}</span>
          </div>
        </div>
       
        <div className="EarningCategoryContainer">
          <div className="earningItem div">
            <Link to="/overallearningpage">
              <BuildingOffice2Icon className="officeicon" />
              <h2>OverAll Earning</h2>
            </Link>
          </div>
          <div className="earningItem div">
            <Link to="/arfakarimtowerearning">
              <BuildingOfficeIcon className="officeicon" />
              <h2>Arfa Karim Earning</h2>
            </Link>
          </div>
          <div className="earningItem div">
            <Link to="/modeltownearning">
              <BuildingOfficeIcon className="officeicon" />
              <h2>Iqbal Town Earning</h2>
            </Link>
          </div>
          <div className="earningItem div">
            <Link to="/johartownearning">
              <BuildingOfficeIcon className="officeicon" />
              <h2>Johar Town Earning</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningPage;
