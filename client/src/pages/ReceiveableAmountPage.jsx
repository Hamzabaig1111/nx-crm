import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import "../styles/ReceiveableamountPage.css";
import Header from "../components/Header";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, BarController);
// Here page of Amount Receivealbe for me
const ReceiveableAmountPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["receiveableamount", selectedMonth],
    queryFn: () => {
      const apiURL =
        "/feerecord/receivablestats";
      return axios
        .get(apiURL, {
          withCredentials: true,
          params: { month: selectedMonth },
        })
        .then((res) => res.data);
    },
  });

  // Additional checks to prevent errors when data or data.studentDetails is undefined
  const chartData = {
    labels: data?.studentDetails?.map((student) => student.std_name) || [],
    datasets: [
      {
        label: "Receivable Fee",
        data:
          data?.studentDetails?.map(
            (student) => student.updated_receivable_fee
          ) || [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: data?.studentDetails?.map((student) => student.std_name) || [],
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };
  if (isPending) return <div>Loading........</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const handleFeeExportDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "/feerecord/excelexportfeedetail",
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "exported-fee-details.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="receiveable-amount-page">
      <Header routeName="Total Fee Finance" />
      <div className="search-or-filter-parent">
        <div className="search-or-filter">
          <label htmlFor="monthFilter">Select Month:</label>
          <select
            id="monthFilter"
            name="monthFilter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <button onClick={handleFeeExportDetails}>Exports Fee Report</button>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="data-filter-results">
        {isPending ? (
          <div className="loading">
            <FeeLoadingSkeleton />
          </div>
        ) : (
          <div className="agent-table-container">
            <table className="my-agent-table">
              <thead>
                <tr>
                  <th className="student-name">Student Name</th>
                  <th className="agent-name">Agent Name</th>
                  <th className="agent-name">Course Name</th>
                  <th className="agent-name">Batch</th>
                  <th className="agent-name">Course Duration</th>
                  <th className="agent-name">Course Total Fee</th>
                  <th className="agent-name">Received Fee</th>
                  <th className="remaining-installments">
                    Remaining Installments
                  </th>
                  <th className="next-installment-due">Next Installment Due</th>
                  <th className="installment-dates">Installment Dates</th>
                  <th className="receivable-fee">Receivable Fee</th>
                </tr>
              </thead>
              <tbody>
                {data?.studentDetails?.map((student) => (
                  <tr key={student?._id}>
                    <td className="student-name">{student?.std_name}</td>
                    <td className="agent-name">{student?.agent_name}</td>
                    <td className="agent-name">{student?.std_coursename}</td>
                    <td className="agent-name">{student?.std_batch}</td>
                    <td className="agent-name">
                      {student?.std_courseduration}
                    </td>
                    <td className="agent-name">{student?.total_course_fee}</td>
                    <td className="agent-name">
                      {student?.fee_on_admission_received}
                    </td>
                    <td className="remaining-installments">
                      {student?.remaining_fee}
                    </td>
                    <td className="next-installment-due">
                      {new Date(
                        student?.next_installments[0]?.due_date
                      ).toLocaleDateString()}
                    </td>
                    <td className="installment-dates">
                      {student?.next_installments?.map((installment, index) => (
                        <div key={index}>
                          <strong>{installment?.month}</strong>{" "}
                          {new Date(installment?.due_date).toLocaleDateString()}
                          <br />
                        </div>
                      ))}
                    </td>
                    <td className="receivable-fee">
                      {student?.updated_receivable_fee?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="10" className="total-receivable-fee">
                    Total Receivable Fee
                  </td>
                  <td style={{ fontWeight: "bold" }} className="total-fee">
                    {data?.totalReceivableFee?.toFixed(2)}
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

export default ReceiveableAmountPage;
