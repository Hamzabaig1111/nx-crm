import React, { useState, useEffect } from "react";
import axios from "../components/BaseURL";
import { Pie } from "react-chartjs-2"; // Import the Pie component
import "../styles/ActiveBadges.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
Chart.register(ArcElement, DoughnutController, Legend, Tooltip);

const ActiveBadgesPage = () => {
  const [status, setStatus] = useState("completed");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/courses/getactivebadges?status=${status}`
      );
      setData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };
  console.log(data);

  // Calculate the distribution of badges based on their status
  const getStatusDistribution = () => {
    const distribution = {
      completed: 0,
      inprogress: 0,
      will_beStart: 0,
    };

    data.forEach((badge) => {
      distribution[badge.status]++;
    });

    return Object.values(distribution);
  };

  // Chart data
  const chartData = {
    labels: ["Completed", "In Progress", "Will Be Start"],
    datasets: [
      {
        data: getStatusDistribution(),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };
  return (
    <div className="active-badges-container">
      <Header routeName="Active Badges" />
      <div className="status-filter">
        <label htmlFor="statusFilter">Select Status:</label>
        <select
          id="statusFilter"
          name="statusFilter"
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
          <option value="will_beStart">Will Be Start</option>
        </select>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      <div className="parentContainerofActiveBadges">
        <table className="badges-table">
          <thead>
            <tr>
              <th>Badge ID</th>
              <th>Badge Name</th>
              <th>Course Name</th>
              <th>No of Students</th>
              <th>Category</th>
              <th>Status</th>
              <th>View</th>
              {/* Add more columns based on your data structure */}
            </tr>
          </thead>
          <tbody>
            {data.map((badge) => (
              <tr key={badge._id}>
                <td>{badge._id}</td>
                <td>{badge.Batch}</td>
                <td>{badge.course_name}</td>
                <td>{badge.studentsCount}</td>
                <td>{badge.course_cat}</td>
                <td>{badge.status}</td>
                <td>
                  <Link to={`/singleBadgePage/${badge.Batch}`}>
                    <MagnifyingGlassIcon className="myiconsarch" />
                  </Link>
                </td>
                {/* Add more columns based on your data structure */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="chart_pie_container">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ActiveBadgesPage;
