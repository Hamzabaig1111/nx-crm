import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import Header from "../components/Header";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import "../styles/ArfaKareemEarning.css";
const ArfaKarimEarning = () => {
  const username = localStorage.getItem("username");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["ArfaKarimEarning"],
    queryFn: () =>
      axios.get("/agents/branchearning/dailyEarningsArfaKareem").then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  return (
    <div className="IqbalTownEarningContainer">
      <Header routeName="Arfa Karim Earning" />
      <div className="detailIqbalTownEarningContainer">
        <div className="filterContainer">
          <div className="currentUser">
            <span>{username}</span>
          </div>
        </div>
        {isPending ? (
          <div className="loading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occurred"
        ) : data && data.feeRecords ? (
          <div className="ArfaKarimFeeTableContainer">
            <div className="JoharTotalEarningsContainer">
              <p>
                <span>Total Earning Today</span>
                {data.totalEarnings}
              </p>
            </div>
            <table className="myFeeTable">
              <thead>
                <tr>
                  <th className="feetableth">Student Name</th>
                  <th className="feetableth">Agent Name</th>
                  <th className="feetableth">Branch Name</th>
                  <th className="feetableth">Course Name</th>
                  <th className="feetableth">Total Course Fee</th>
                  <th className="feetableth">Received Fee</th>
                  <th className="feetableth">Pending Fee</th>
                  <th className="feetableth">Number of Installments</th>
                  <th className="feetableth">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.feeRecords?.map((feerecord) => (
                  <tr className="table-row-fee" key={feerecord._id}>
                    <td className="table-data-fee">{feerecord.std_name}</td>
                    <td className="table-data-fee">{feerecord.agent_name}</td>
                    <td className="table-data-fee">{feerecord.agent_branch}</td>
                    <td className="table-data-fee">
                      {feerecord.std_coursename}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.total_course_fee}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.updated_received_fee}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.updated_receivable_fee}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.no_of_installments}
                    </td>
                    <td className="table-data-fee">{feerecord.status}</td>{" "}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8" className="table-data-fee">
                    Total Received
                  </td>
                  <td className="table-data-fee" style={{ fontWeight: "bold" }}>
                    {data?.totalEarnings}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="EarningError">No Earning Record Found Today</div>
        )}
      </div>
    </div>
  );
};

export default ArfaKarimEarning;
