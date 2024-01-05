import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/Agents.css";
import axios from "../components/BaseURL";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import Popup from "reactjs-popup";
const AgentsPage = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["agentData"],
    queryFn: () =>
      axios
        .get("/agents/", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const deleteMutationFn = useMutation({
    mutationFn: (agentId) => {
      return axios.delete(`/agents/${agentId},`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleDeleteAgent = (id) => {
    console.log(id);
    deleteMutationFn.mutate(id);
  };
  console.log(data);
  const handleClickExports = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/agents/getagentstoexcel", {
        withCredentials: true,
        responseType: "blob", // Set the response type to 'blob'
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "exported-data.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="agentParentContainer">
      <Header routeName="Agents" />
      <div className="agentContentContainer">
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
          <Link to="/addnewagent">
            <button>Add a New Agent</button>
          </Link>
          <button onClick={handleClickExports}>Export Agents</button>
        </div>
        {isPending ? (
          <div className="loeading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occured"
        ) : (
          <div className="AgentTableContainer">
            <table className="myagenttablecontainer">
              <thead>
                <tr>
                  <th className="agenttableth">Agent-Name</th>
                  <th className="agenttableth">Email</th>
                  <th className="agenttableth">Desigination</th>
                  <th className="agenttableth">Contact</th>
                  <th className="agenttableth">Joining Date</th>
                  <th className="agenttableth">Success Rate</th>
                  <th className="agenttableth">update</th>
                  <th className="agenttableth">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((agent) => (
                  <tr key={agent._id}>
                    <td className="agentTabletd">{agent.agent_username}</td>
                    <td className="agentTabletd">{agent.email}</td>
                    <td className="agentTabletd">{agent.desigination}</td>
                    <td className="agentTabletd">{agent.contact}</td>
                    <td className="agentTabletd">{agent.joining_date}</td>
                    <td className="agentTabletd">{agent.success_rate}</td>
                    <td className="agentTabletd">
                      <Link to={`/updateagent/${agent._id}`}>
                        <PencilSquareIcon className="TableIcon" />
                      </Link>
                    </td>
                    <td className="agentTabletd">
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
                                onClick={() => handleDeleteAgent(agent._id)}
                                disabled={agent.is_admin}
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

export default AgentsPage;
