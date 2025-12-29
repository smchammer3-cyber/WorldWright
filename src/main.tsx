// ========================================================
// WORLDWRIGHT -- MAIN ENTRY
// File: src/main.tsx
//
// Fix: Wrap app in BrowserRouter so routes + useNavigate work.
// ========================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);