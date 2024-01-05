import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import instance from "../components/BaseURL";
import "../styles/AgentsReports.css";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Colors,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Colors);

const AgentsReports = () => {
  const agentId = localStorage.getItem("userId");
  const branchname = localStorage.getItem("agentBranch");
  const agent_name = localStorage.getItem("username");
  const navigate = useNavigate();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["agentReports"],
    queryFn: () =>
      instance
        .get(`/leads/single/${agentId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  console.log(file);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append the selected file to the FormData object
    formData.append("file", file);

    // Append other data to the FormData object if needed
    formData.append("agentId", agentId);
    formData.append("branchname", branchname);
    formData.append("agent_name", agent_name);
    // Log the FormData object to verify its content
    console.log(formData, "FormDataHeres");

    try {
      setIsLoading(true); // Start loading

      // Use instance to send the FormData to the server
      await instance.post("/leads/singlefile/upload", formData, {
        withCredentials: true,
        // Add any other headers if needed
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
      refetch();
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Process data for the bar graph
  const getStatusCounts = () => {
    const statusCounts = {};

    // Check if data is defined and is an array
    if (Array.isArray(data)) {
      data.forEach((lead) => {
        const status = lead.status || "Unknown";
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
    }

    return statusCounts;
  };

  const getStatusLabels = () => Object.keys(getStatusCounts());

  const getStatusData = () => Object.values(getStatusCounts());

  const chartData = {
    labels: getStatusLabels(),
    datasets: [
      {
        label: "Leads by Status",
        backgroundColor: "#ff9f40",
        borderColor: "#ff9f40",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: getStatusData(),
      },
    ],
  };

  const options = {
    width: 500, // Set the width to 500px
    height: 500, // Set the height to 500px
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: getStatusLabels(),
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
    plugins: {
      colors: {
        enabled: false,
        forceOverride: true,
      },
    },
  };
  const handleDownloadLeads = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.get("/leads/getleadsexports", {
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
      link.download = "exported-data-leads.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDeleteLead = async (id) => {
    try {
      // Make a DELETE request to delete the lead
      const response = await instance.delete(`/leads/${id}`, {
        withCredentials: true,
      });

      // Display success message if lead is deleted successfully
      alert(response.data.message);

      // Refetch the data after deletion
      refetch();
    } catch (error) {
      // Display error message if there's an issue with the deletion
      alert(
        error.response.data.error || "Error deleting lead. Please try again."
      );
    }
  };
  const updateLeadFunction = (leadId) => {
    navigate(`/agentsreports/${leadId}`);
  };

  return (
    <div className="AgentReportContainer">
      <Header routeName="Agents Reports" />
      <div className="agentReportContentContainer">
        {/* Start Creating Table from Here */}
        <div className="uploadContainer">
          <h1>CSV File Upload and Display</h1>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload File"}
          </button>
          <button onClick={handleDownloadLeads} disabled={isLoading}>
            Export Leads
          </button>
        </div>
        {isPending && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error.message}</p>}
        {Array.isArray(data) && data.length === 0 && <p>No data found.</p>}

        <div className="chart-container">
          {Array.isArray(data) && data.length > 0 && (
            <Bar data={chartData} options={options} />
          )}
        </div>
        {Array.isArray(data) && data.length > 0 ? (
          <div className="table-container">
            <table className="agentsTable">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Mobile</th>
                  <th className="table-header">Course Interested</th>
                  <th className="table-header">Branch Name</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Update</th>
                  <th className="table-header">Delete</th>
                  {/* Add more headers based on your data */}
                </tr>
              </thead>
              <tbody>
                {data?.map((lead) => (
                  <tr key={lead._id} className="table-row">
                    <td className="table-data">{lead?.stdname}</td>
                    <td className="table-data">{lead?.email}</td>
                    <td className="table-data">{lead?.mobile}</td>
                    <td className="table-data">{lead?.course_interested}</td>
                    <td className="table-data">{lead?.branchname}</td>
                    <td className="table-data">
                      {new Date(lead?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="table-data">{lead?.status}</td>
                    <td
                      onClick={() => updateLeadFunction(lead?._id)}
                      className="table-data green"
                    >
                      <PencilSquareIcon className="updateIcon" />
                    </td>
                    <td
                      onClick={() => handleDeleteLead(lead?._id)}
                      className="table-data red"
                    >
                      <TrashIcon className="updateIcon" />
                    </td>
                    {/* Add more cells based on your data */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>{<p>No Data Available! Please Upload New Leads</p>}</div>
        )}
        {/* End Creating Table */}
      </div>
    </div>
  );
};

export default AgentsReports;
