import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./telemetry/otel";
import "./telemetry/newrelic";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
