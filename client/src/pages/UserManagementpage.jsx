import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import "../styles/UserManagement.css";
import Popup from "reactjs-popup";

const UserManagementpage = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      axios
        .get("/agents/", { withCredentials: true })
        .then((res) => {
          return res.data;
        }),
  });
  console.log(data);
  const deleteMutationFn = useMutation({
    mutationFn: (agentId) => {
      return axios.delete(`/agents/${agentId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleDeleteUser = (id) => {
    console.log(id);
    deleteMutationFn.mutate(id);
  };

  return (
    <div className="UserManagementContainer">
      <Header routeName="UserMangement" />
      <div className="UserMangementContentContainer">
        <div className="filterContainer">
          <div className="currentUser">
            <span>Usama Ahmad</span>
          </div>
          <div>
            <form className="searchFormContainer" action="">
              <input type="text" placeholder="Search..." />
              <button className="searchbtn">Search</button>
            </form>
          </div>
        </div>
        <div className="addCourseContainer">
          <Link to="/addnewuser">
            <button>Add a User</button>
          </Link>
        </div>
        {isPending ? (
          <div className="loading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occurred"
        ) : (
          <div className="userTableManagementMainContainer">
            <table className="myUsermanagementTable">
              <thead>
                <tr>
                  <th className="usermangementth">Username</th>
                  <th className="usermangementth">Image</th>
                  <th className="usermangementth">Email</th>
                  <th className="usermangementth">Contact</th>
                  <th className="usermangementth">Joining_date</th>
                  <th className="usermangementth">Agent Branch</th>
                  <th className="usermangementth">update</th>
                  <th className="usermangementth">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user) => (
                  <tr key={user?._id}>
                    <td className="usermanagementtd">{user?.agent_username}</td>
                    <td className="usermanagementtd">{user?.userImage}</td>
                    <td className="usermanagementtd">{user?.email}</td>
                    <td className="usermanagementtd">{user?.contact}</td>
                    <td className="usermanagementtd">{user?.joining_date}</td>
                    <td className="usermanagementtd">{user?.agentBranch}</td>
                    <td className="usermanagementtd">
                      <PencilSquareIcon className="TableIcon" />
                    </td>
                    <td className="usermanagementtd">
                      <Popup
                        trigger={<TrashIcon className="TableIcon" />}
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <button className="close" onClick={close}>
                              <XMarkIcon className="myXIcon" />
                            </button>
                            <div className="headerTitle">
                              <h2>Are you sure to delete</h2>
                            </div>
                            <div className="actions">
                              <button
                                className="button"
                                onClick={() => handleDeleteUser(user?._id)}
                              >
                                {" "}
                                Delete{" "}
                              </button>
                              <button
                                className="button"
                                onClick={() => {
                                  console.log("modal closed ");
                                  close();
                                }}
                              >
                                Discard
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementpage;
