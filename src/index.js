import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/Router";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);