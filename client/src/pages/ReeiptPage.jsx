import React, { useState } from "react";
import "../styles/ReceiptPage.css";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests
import { PrinterIcon } from "@heroicons/react/24/outline";

const ReceiptPage = () => {
  const { state } = useLocation();
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [searchType, setSearchType] = useState("cnic"); // State to store the search type
  const [studentDetail, setStudentDetail] = useState([]);

  const handleSearch = async () => {
    try {
      // Make an API request to fetch student details based on the search term and type
      const response = await axios.get(
        `https://crm-lms-sever.vercel.app/api/admissions?${searchType}=${searchTerm}`,
        { withCredentials: true }
      );

      // Handle the response and update the state or perform other actions
      console.log(response.data);
      setStudentDetail(response.data);
      // You can update the state or perform other actions with the fetched data
    } catch (error) {
      console.error("Error searching for student:", error);
      // Handle errors as needed
    }
  };
  console.log(studentDetail);

  return (
    <div className="receiptContainer">
      <Header routeName="Print Receipt" />
      <div className="userPrintReceiptDetails">
        <div className="searchReceiptContainer">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              required
              type="text"
              placeholder="XXXXX-XXXXXXX-X"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="cnic">CNIC</option>
            </select>
            <button onClick={handleSearch}>Search</button>
          </form>
        </div>
        <div className="brandContainer">
          <img src="/assets/logp.png" className="myReceiptLogo" alt="" />
          <h1>STUDENT LEDGER BUDGET & RECEIPTS SECTION</h1>
        </div>
        <div className="previewFormContainer">
          {/* Display student details in the table */}
          {/* You can map over the student details and display them here */}
          {/* Update the following table based on your data structure */}
          <table className="previewTableContainer">
            <thead>
              <tr>
                <th className="previewTableTh">Sr</th>
                <th className="previewTableTh">Name</th>
                <th className="previewTableTh">Batch</th>
                <th className="previewTableTh">CNIC</th>
                <th className="previewTableTh">Installment No</th>
                <th className="previewTableTh">Total Amount</th>
                <th className="previewTableTh">Status</th>
                <th className="previewTableTh">Expiry Date</th>
                <th className="previewTableTh">Paid Date</th>
                <th className="previewTableTh">Print</th>
              </tr>
            </thead>
            <tbody>
              {studentDetail?.map((item) => (
                <tr>
                  <td className="previewtabletd">1</td>
                  <td className="previewtabletd">{item?.student_name}</td>
                  <td className="previewtabletd">{item?.std_batch}</td>
                  <td className="previewtabletd">{item?.CNIC}</td>
                  <td className="previewtabletd">{item?.num_installments}</td>
                  <td className="previewtabletd">{item?.course_fee}</td>
                  <td className="previewtabletd">{item?.status}</td>
                  <td className="previewtabletd">{item?.doe}</td>
                  <td className="previewtabletd">{item?.doe}</td>
                  <td className="previewtabletd">
                    <Link to={`/printchallan/${item._id}`}>
                      <PrinterIcon className="printiIcon" />
                    </Link>
                  </td>
                  {/* Add other fields based on your data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
