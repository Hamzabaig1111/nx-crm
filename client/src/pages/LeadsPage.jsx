import React, { useState, useEffect } from "react";
import axios from "axios"; // You might need to install axios if not already installed

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  // Add state for other form fields

  useEffect(() => {
    // Fetch leads data from your API
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/leads",{withCredentials:true}); // Replace with your API endpoint
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Send form data to your API for processing
    try {
      const response = await axios.post("/api/leads", {
        name,
        email,
        mobile,
        // Include other form fields
      });

      // Handle success, update leads state, show success message, etc.
      console.log("Lead submitted successfully:", response.data);
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Error submitting lead:", error);
    }
  };

  return (
    <div>
      <h1>Leads Page</h1>

      {/* Display leads table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            {/* Include other table headers */}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.mobile}</td>
              {/* Include other table data */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lead submission form */}
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mobile:</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Include other form fields */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeadsPage;
