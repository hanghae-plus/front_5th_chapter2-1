import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProductProvider } from "./providers/ProductProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>
);
