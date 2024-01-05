import React from "react";
import Header from "../components/Header";

const CustomersPage = () => {
  return (
    <div className="CustomerContainer">
      <Header routeName="Customers" />
      <div className="CustomersContentContainer">
        I am the Customers Content Container
      </div>
    </div>
  );
};

export default CustomersPage;
