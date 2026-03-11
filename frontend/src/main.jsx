import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CampaignProvider } from "./Context/CampaignContext";
import { UserContextProvider } from "./Context/userContext";
import "./index.css";

import { ThemeProvider } from "./components/ThemeProvider";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <UserContextProvider>
        <CampaignProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CampaignProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
