import { useQuery } from "@tanstack/react-query";
import React from "react";
import Header from "../components/Header";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import axios from "../components/BaseURL";

const OverAllEeaning = () => {
  const username = localStorage.getItem("username");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["OverAllEarining"],
    queryFn: () =>
      axios
        .get("/feerecord/dailystats/dsaleearndata", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  return (
    <div className="OverAllEearningContainer">
      <Header routeName="OverAll Earning" />
      <div className="detailvoerAllearningContainer">
        <div className="filterContainer">
          <div className="currentUser">
            <span>{username}</span>
          </div>
        </div>
        {isPending ? (
          <div className="loeading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occurred"
        ) : (
          <div className="FeeTableContainer">
            <div className="TotalEarningsContainer">
              <p>
                <span style={{ fontWeight: "bold" }}>
                  Total Courses Fee Today:
                </span>{" "}
                Rs{data.totalEarnings}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  Total Updated Received Fee Today:
                </span>
                Rs {data.totalUpdatedReceivedFee.toFixed(2)}
              </p>
            </div>
            <table className="myFeeTable">
              <thead>
                <tr>
                  <th className="feetableth">Agent Name</th>
                  <th className="feetableth">Branch Name</th>
                  <th className="feetableth">Student Name</th>
                  <th className="feetableth">Course Name</th>
                  <th className="feetableth">Total Course Fee</th>
                  <th className="feetableth">Pending Fee</th>
                  <th className="feetableth">Number of Installments</th>
                  <th className="feetableth">Status</th>
                  <th className="feetableth">Received Fee</th>
                </tr>
              </thead>
              <tbody>
                {data?.feeRecords?.map((feerecord) => (
                  <tr className="table-row-fee" key={feerecord._id}>
                    <td className="table-data-fee">{feerecord.agent_name}</td>
                    <td className="table-data-fee">{feerecord.agent_branch}</td>
                    <td className="table-data-fee">{feerecord.std_name}</td>
                    <td className="table-data-fee">
                      {feerecord.std_coursename}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.total_course_fee}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.updated_receivable_fee.toFixed(2)}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.updated_no_of_installments}
                    </td>
                    <td className="table-data-fee">{feerecord.status}</td>{" "}
                    <td className="table-data-fee">
                      {feerecord.updated_received_fee.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8" className="table-data-fee">
                    Total Received
                  </td>
                  <td className="table-data-fee" style={{ fontWeight: "bold" }}>
                    {"Rs:" + data.totalUpdatedReceivedFee.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverAllEeaning;
