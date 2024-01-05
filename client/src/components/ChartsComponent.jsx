import React, { useEffect, useState } from "react";
import "../styles/ChartsComponents.css";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const ChartsComponent = () => {
  const [batchesDetail, setBatchesDetail] = useState([]);
  const [agentCount, setAgentCounts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://crm-lms-sever.vercel.app/api/courses/getactivebadgeswithstatus",
          { withCredentials: true }
        );
        setBatchesDetail(response.data.totalBatchesByStatus);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://crm-lms-sever.vercel.app/api/leads/getagentsstatdata",
          { withCredentials: true }
        );
        setAgentCounts(Object.values(response.data));
      } catch (error) {
        console.error("Error fetching agent counts:", error);
      }
    };
  
    fetchData();
  }, []);
  
   console.log(agentCount)
  const getChartData = () => {
    const labels = Object.keys(batchesDetail);
    const data = Object.values(batchesDetail);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        },
      ],
    };
  };
  return (
    <div className="ChartsParentComponent">
      <div className="charuuperContainer">
        <div className="badthsChartsDisplayContainer">
          <h2>Batch</h2>
          {Object.keys(batchesDetail).length > 0 && (
            <Doughnut
              data={getChartData()}
              className="dounat-charContainer"
              options={{
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: "Batch Status",
                },
              }}
            />
          )}
        </div>
        <div className="leadsChartsDisplayContainer">
          <h2>Leads Charts</h2>
          {/* Leads Chart display Here */}
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;
