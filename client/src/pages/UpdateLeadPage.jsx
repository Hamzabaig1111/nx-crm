import React, { useState, useEffect } from "react";
import axios from "../components/BaseURL";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/UpdateLeadPage.css";
import Header from "../components/Header";
const UpdateLeadPage = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState({
    status: "",
  });

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axios.get(
          `/leads/${leadId}`,
          { withCredentials: true }
        );
        setLeadData(response.data);
      } catch (error) {
        console.error("Error fetching lead data:", error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchLeadData();
  }, [leadId]);

  const handleUpdateLead = async () => {
    try {
      const response = await axios.put(
        `/leads/${leadId}`,
        leadData,
        { withCredentials: true }
      );
      if (leadData.status === "success") {
        // Redirect to "/studentregistration" page
        alert(response.data.message);
        navigate("/studentregistraction");
      }
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating lead:", error);
      alert(error);
      // Handle error, e.g., show an error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="UpdateLeadContainer">
      <Header routeName="Update Lead" />
      <form className="formUpdateLead">
        <div className="updatelaedItemSingle">
          <label>Status:</label>
          <select name="status" value={leadData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="visit">Visit</option>
            <option value="future prospect">Future Prospect</option>
            <option value="not interested">Not Interested</option>
          </select>
        </div>
        <button type="button" onClick={handleUpdateLead}>
          Update Lead
        </button>
      </form>
    </div>
  );
};

export default UpdateLeadPage;
