import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SideBar from "./components/SideBar";
import App from "./App";
import AgentsPage from "./pages/AgentsPage";
import UpdateAgent from "./pages/UpdateAgent";
import AddNewAgent from "./pages/AddNewAgent";
import AgentsReports from "./pages/AgentsReports";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrderPage";
import UpdateOrderPage from "./pages/UpdateOrderPage";
import CoursesPage from "./pages/CoursesPage";
import AddNewCoursePage from "./pages/AddNewCoursePage";
import Feepage from "./pages/Feepage";
import EditFeePage from "./pages/EditFeePage";
import SettingsPage from "./pages/SettingsPage";
import UserManagementpage from "./pages/UserManagementpage";
import SubmitWork from "./pages/SubmitWork";
import MyJobs from "./pages/MyJobs";
import ProfilePage from "./pages/ProfilePage";
import TicketsPage from "./pages/TicketsPage";
import EarningPage from "./pages/EarningPage";
import ExpensesPage from "./pages/ExpensesPage";
import AddNewUser from "./pages/AddNewUser";
import LoginPage from "./pages/LoginPage";
import CreateLead from "./pages/CreateLead";
import UpdateCoursesPage from "./pages/UpdateCoursesPage";
import RegistrationPage from "./pages/RegistractionPage";
import ReceiptPage from "./pages/ReeiptPage";
import PrintVoucher from "./pages/PrintVoucher";
import { CreateReporting } from "./pages/CreateReporting";
import ReceiveableAmountPage from "./pages/ReceiveableAmountPage";
import ActiveBadgesPage from "./pages/ActiveBadgesPage";
import SingleBatchPage from "./pages/SingleBatchPage";
import AgentWiseSaleReportDaily from "./pages/AgentWiseSaleReportDaily";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateLeadPage from "./pages/UpdateLeadPage";
import OverAllEeaning from "./pages/OverAllEeaning";
import ArfaKarimEarning from "./pages/ArfaKarimEarning";
import ModelTownEarning from "./pages/ModelTownEarning";
import JoharTownEarning from "./pages/JoharTownEarning";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

const MainContainer = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of the token in local storage
    const token = localStorage.getItem("token");
    setIsUserLoggedIn(!!token);
  }, []);

  return (
    <div className="mainContainer">
      {isUserLoggedIn && <SideBar />}
      <div className="mainContextContainer">{children}</div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <App />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/agents"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <AgentsPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/updateagent/:agentId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <UpdateAgent />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/addnewagent"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <AddNewAgent />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/agentsreports"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <AgentsReports />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          {/* Update Leads Single */}
          <Route
            path="/agentsreports/:leadId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <UpdateLeadPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/customers"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <CustomersPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/orders"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <OrdersPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/orders/:orderId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <UpdateOrderPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/courses"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <CoursesPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/addnewcourse"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <AddNewCoursePage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/fee"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <Feepage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/fee/:feeId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <EditFeePage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/settings"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <SettingsPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/usermanagement"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <UserManagementpage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/submitwork"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <SubmitWork />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/myjobs"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <MyJobs />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/profile"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ProfilePage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/tickets"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <TicketsPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/earning"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <EarningPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/expenses"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ExpensesPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/addnewuser"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <AddNewUser />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/updatecourse/:courseId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin"]}>
                  <UpdateCoursesPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/createlead"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <CreateLead />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/studentregistraction"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <RegistrationPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/printrecepit"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ReceiptPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/printchallan/:receiptId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <PrintVoucher />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/createreporting"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <CreateReporting />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/receiveableamount"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ReceiveableAmountPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/activebadges"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ActiveBadgesPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/singleBadgePage/:badgeId"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <SingleBatchPage />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/dailysalereport"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <AgentWiseSaleReportDaily />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          {/* Earning Pages Start Here */}
          <Route
            path="/overallearningpage"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <OverAllEeaning />
                </ProtectedRoute>
              </MainContainer>
            }
          />{" "}
          <Route
            path="/arfakarimtowerearning"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ArfaKarimEarning />
                </ProtectedRoute>
              </MainContainer>
            }
          />{" "}
          <Route
            path="/modeltownearning"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <ModelTownEarning />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route
            path="/johartownearning"
            element={
              <MainContainer>
                <ProtectedRoute roles={["admin", "employee", "accountant"]}>
                  <JoharTownEarning />
                </ProtectedRoute>
              </MainContainer>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
