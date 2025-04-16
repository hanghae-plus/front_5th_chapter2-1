import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@advanced/App";

ReactDOM.createRoot(document.getElementById("app") || document.createElement("div")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
