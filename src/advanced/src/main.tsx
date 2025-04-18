import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MainProvider } from "./context/MainProvider.tsx";
import { SetIntervalWrapper } from "./hooks/SetIntervalWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <SetIntervalWrapper>
        <App />
      </SetIntervalWrapper>
    </MainProvider>
  </StrictMode>
);
