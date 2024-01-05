import React from "react";
import Header from "../components/Header";
import "../styles/Profile.css";
import { useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";

const ProfilePage = () => {
  const agentID = localStorage.getItem("userId");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["singleAgent"],
    queryFn: () =>
      axios
        .get(`/agents/${agentID}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <div className="ProfileContainer">
      <Header routeName="Profile" />

      <div className="userProfileContainer">
        {isPending && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <>
            <h2>Agent Profile</h2>
            <div className="profileDetails">
              <div>
                <img
                  src={data?.userImage || "/default-avatar.jpg"}
                  alt="Agent Avatar"
                  className="profileImage"
                />
              </div>
              <div className="profileInfo">
                <p>
                  <strong>Name:</strong> {data?.agent_fullName}
                </p>
                <p>
                  <strong>Email:</strong> {data?.email}
                </p>
                <p>
                  <strong>Contact:</strong> {data?.contact || "N/A"}
                </p>
                <p>
                  <strong>Joining Date:</strong> {data?.joining_date}
                </p>
                <p>
                  <strong>Designation:</strong> {data?.desigination}
                </p>
                <p>
                  <strong>Agent Branch:</strong> {data?.agentBranch}
                </p>
                <p>
                  <strong>Username:</strong> {data?.agent_username}
                </p>
                <p>
                  <strong>Admin:</strong> {data?.is_admin ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Accountant:</strong>{" "}
                  {data?.is_Accountant ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Employee:</strong> {data?.is_employee ? "Yes" : "No"}
                </p>
                <p>
                   {data?.agentSignatureStamp}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
