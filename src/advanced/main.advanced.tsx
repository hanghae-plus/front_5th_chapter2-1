import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";

// React 앱 마운트 요소
const reactRoot = document.getElementById("app");

if (reactRoot) {
    ReactDOM.createRoot(reactRoot).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
