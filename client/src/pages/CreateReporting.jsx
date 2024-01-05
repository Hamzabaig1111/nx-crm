import React from "react";
import "../styles/CreateReporting.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  BanknotesIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
export const CreateReporting = () => {
  return (
    <>
      <Header routeName="Reporting" />
      <div className="createagentreportContainer">
        <Link to="/receiveableamount">
          <div>
            <BanknotesIcon className="icononereport" />
            <p className="boxitemelement">Receiveableamount</p>
          </div>
        </Link>
        <Link to="/activebadges">
          <div>
            <UserGroupIcon className="icononereport" />
            <p className="boxitemelement">Active Batches</p>
          </div>
        </Link>
        <Link to="/dailysalereport">
          <div>
            <PresentationChartBarIcon className="icononereport" />
            <p className="boxitemelement">Daily Sale Report</p>
          </div>
        </Link>
      </div>
    </>
  );
};
