import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails.jsx";
import Campaign from "./pages/Campaign";
import CampaignDashboard from "./pages/CampaignDashboard";
import CampaignName from "./pages/CampaignName";
import ImportContacts from "./pages/ImportContacts";
import SelectType from "./pages/SelectType";
import WriteMail from "./pages/WriteMail";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import CreateTemplate from "./Templates/CreateTemplate.jsx";
import TemplateLibrary from "./Templates/TemplateLibrary";
import Support from "./pages/Support";
import { useDetails } from "./Context/userContext.jsx";
import Pricing from "./pages/Pricing.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import { AllUsers } from "./Admin/AllUsers.jsx";
import { EditUserDetails } from "./Admin/EditUserDetails.jsx";
import { Templatehandling } from "./Admin/Templatehandling.jsx";
import { AdminHome } from "./Admin/AdminHome.jsx";
import { PlansUpdtion } from "./Admin/PlansUpdtion.jsx";
import { UserInfo } from "./Admin/UserInfo.jsx";


/* Layout */
import Header from "./pages/Header";
import Footer from "./pages/Footer";

/* Context */
import { CampaignProvider } from "./Context/CampaignContext";

/* Toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* API URL */
export const AppUrl = import.meta.env.VITE_API_URL;

import axios from "axios";

// Global interceptor to defensively catch expired cookies/sessions
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        console.warn("Session expired (401). Clearing local data and redirecting to login.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

function App() { 
  const {user} = useDetails();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* CONTEXT PROVIDER */}
      <CampaignProvider>

        {/* TOAST */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* ROUTES */}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={user?<Dashboard />:<Login />} />
          <Route path="/analytics" element={user?<Analytics />:<Login />} />
          <Route path="/contacts" element={user?<Contacts />:<Login />} />
          <Route path="/profile" element={user?<Profile />:<Login />} />
           <Route path="/campaign/templates" element={user?<TemplateLibrary />:<Login />} />
          <Route path="/campaign" element={user?<Campaign />:<Login />} />
          <Route path="/campaigns" element={user ? <CampaignDashboard /> : <Login />} />
          <Route path="/campaign/new" element={user ? <CampaignName /> : <Login />} />
          <Route path="/campaign/contacts" element={user ? <ImportContacts /> : <Login />} />
          <Route path="/campaign/type" element={user ? <SelectType /> : <Login />} />
          <Route path="/campaign/write" element={user ? <WriteMail /> : <Login />} />
          <Route path="/campaign/editor" element={user ? <Editor /> : <Login />} />
          <Route path="/campaign/preview" element={user ? <Preview /> : <Login />} />
          <Route path="/createtemplate" element={user ? <CreateTemplate /> : <Login />} />
          <Route path="/userdetails" element={user ? <UserDetails /> : <Login />} />
          <Route path="/support" element={<Support />} />
          <Route path="/adminPanel" element={<AdminHome />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/edit-user/:id" element={<EditUserDetails />} />
          <Route path="/admin/templates" element={<Templatehandling />} />
          <Route path="/admin/plans" element={<PlansUpdtion />} />
          <Route path="/admin/userinfo" element={<UserInfo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-32 text-2xl font-bold">
                404 - Page Not Found
              </h1>
            }
          />

        </Routes>

      </CampaignProvider>

      {/* FOOTER */}
      {isLandingPage && <Footer />}
    </>
  );
}

export default App;
