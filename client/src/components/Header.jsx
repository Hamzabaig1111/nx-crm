import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import {
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  CogIcon,
  MoonIcon,
  ReceiptRefundIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const Header = ({ routeName }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const userImage = localStorage.getItem("userimage");
  const handlePopUp = () => {
    setOpenPopUp((prev) => !prev);
  };
  let username = localStorage.getItem("username");
  console.log(username);
  return (
    <div className="headerContainer">
      <div className="headerleft">
        <h1>{routeName}</h1>
      </div>
      <div className="headerright">
        <div className="togglebuttons">
          <SunIcon className="toggleIcon" />
          <MoonIcon className="toggleIcon" />
        </div>
        <div className="userContainer">
          {userImage === null || userImage === "" ? (
            <img
              onClick={handlePopUp}
              src="/assets/logp.png"
              alt="userdefaultimage"
            />
          ) : (
            <img onClick={handlePopUp} src={userImage} alt="userImage" />
          )}

          {openPopUp ? (
            <div className="userlistItems">
              <div className="adminContainer">
                {userImage === null || userImage === "" ? (
                  <img
                    onClick={handlePopUp}
                    src="/assets/logp.png"
                    alt="userdefaultimage"
                    className="popupImage"
                  />
                ) : (
                  <img onClick={handlePopUp} className="popupImage" src={userImage} alt="userImage" />
                )}

                <h1>{username}</h1>
              </div>
              <ul>
                <li>
                  <Link className="useritemLink" to="/profile">
                    <UserIcon className="userlistIcon" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link className="useritemLink" to="/myjobs">
                    <BriefcaseIcon className="userlistIcon" />
                    <span>My Jobs</span>
                  </Link>
                </li>
                <li>
                  <Link className="useritemLink" to="/tickets">
                    <ReceiptRefundIcon className="userlistIcon" />
                    <span>Tickets</span>
                  </Link>
                </li>
                <li>
                  <Link className="useritemLink" to="/submitwork">
                    <ArrowTrendingUpIcon className="userlistIcon" />
                    <span>Submit Work</span>
                  </Link>
                </li>
                <li>
                  <Link className="useritemLink" to="/settings">
                    <CogIcon className="userlistIcon" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
