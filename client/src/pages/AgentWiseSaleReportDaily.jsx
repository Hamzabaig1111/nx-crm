import React, { useState, useMemo, useEffect } from "react";
import "../styles/DailySaleReport.css";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import { GetAgentNamesDirect } from "../components/AgentNames";
const AgentWiseSaleReportDaily = () => {
  const [agentCounts, setAgentCounts] = useState({
    success: 0,
    pending: 0,
    visit: 0,
    futureProspect: 0,
    totalLeads: 0,
  });

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["agentReports"],
    queryFn: () =>
      axios
        .get("/leads", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const { mycustemDatalist } = GetAgentNamesDirect();
  const [filterByAgent, setFilterByAgent] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    let filtered = data;

    if (filterByAgent) {
      filtered = filtered.filter((lead) => lead.name === filterByAgent);
    }

    if (filterByStatus) {
      filtered = filtered.filter((lead) => lead.status === filterByStatus);
    }

    return filtered;
  }, [data, filterByAgent, filterByStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/leads/getagentsstatdata",
          { withCredentials: true }
        );
        setAgentCounts(response.data);
      } catch (error) {
        console.error("Error fetching agent counts:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="DailyREportSectionMainContainer">
      <Header routeName="Overall Leads" />
      <div className="agentCountStatusContainer">
        <table className="agentcounttable">
          <thead>
            <tr>
              <th className="agentcounttableth">Success</th>
              <th className="agentcounttableth">Pending</th>
              <th className="agentcounttableth">Visit</th>
              <th className="agentcounttableth">Future Prospect</th>
              <th className="agentcounttableth">Total Leads</th>
            </tr>
          </thead>
          <tbody>
            <tr className="agentcounttabletr">
              <td className="agentcounttabletd">{agentCounts.success}</td>
              <td className="agentcounttabletd">{agentCounts.pending}</td>
              <td className="agentcounttabletd">{agentCounts.visit}</td>
              <td className="agentcounttabletd">
                {agentCounts.futureProspect}
              </td>
              <td className="agentcounttabletd">{agentCounts.totalLeads}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="agentfilterTitle">
        <h2>Filter Report</h2>
      </div>
      <div className="sortingandfiltercontainer">
        <div className="fiterdivcontainer">
          <label htmlFor="filterbyagent">Agent Name</label>
          <select
            name="filterbyagent"
            id="filterbyagent"
            onChange={(e) => setFilterByAgent(e.target.value)}
          >
            <option value="">All Agents</option>
            {mycustemDatalist?.error && <div>Error...</div>}
            {mycustemDatalist?.data?.map((agentName) => (
              <option key={agentName} value={agentName}>
                {agentName}
              </option>
            ))}
          </select>
        </div>
        <div className="fiterdivcontainer">
          <label htmlFor="filterbystatus">Status</label>
          <select
            name="filterbystatus"
            id="filterbystatus"
            onChange={(e) => setFilterByStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="visit">Visit</option>
            <option value="future prospect">Future Prospect</option>
          </select>
        </div>
      </div>
      <div className="dailyreportContentDisplay">
        {isPending && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error.message}</p>}
        {filteredData.length === 0 && <p>No records found.</p>}
        {filteredData.length > 0 && (
          <div className="table-containeragentsreport">
            <table className="agentsTableDisplay">
              <thead>
                <tr className="agentcounttabletr">
                  <th className="agentstablethdisplay">Agent Name</th>
                  <th className="agentstablethdisplay">Std Name</th>
                  <th className="agentstablethdisplay">Email</th>
                  <th className="agentstablethdisplay">Mobile</th>
                  <th className="agentstablethdisplay">Course Interested</th>
                  <th className="agentstablethdisplay">Status</th>
                  {/* Add more headers based on your data */}
                </tr>
              </thead>
              {filteredData?.map((lead) => (
                <tr key={lead._id} className="table-row">
                  <td className="agentstabledatatddisplay">
                    {lead.agent_name}
                  </td>
                  <td className="agentstabledatatddisplay">{lead.stdname}</td>
                  <td className="agentstabledatatddisplay">{lead.email}</td>
                  <td className="agentstabledatatddisplay">{lead.mobile}</td>
                  <td className="agentstabledatatddisplay">
                    {lead.course_interested}
                  </td>
                  <td className="agentstabledatatddisplay">{lead.status}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentWiseSaleReportDaily;
