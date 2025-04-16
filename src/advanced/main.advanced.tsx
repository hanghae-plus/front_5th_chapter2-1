import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Container } from "./components";
import { LastSelectedProvider, ProductProvider } from "./providers";
import { Product } from "./types";

const initialProductState: Product[] = [
  { id: "p1", name: "상품1", cost: 10_000, quantity: 50, discount: 0.1 },
  { id: "p2", name: "상품2", cost: 20_000, quantity: 30, discount: 0.15 },
  { id: "p3", name: "상품3", cost: 30_000, quantity: 20, discount: 0.2 },
  { id: "p4", name: "상품4", cost: 15_000, quantity: 0, discount: 0.05 },
  { id: "p5", name: "상품5", cost: 25_000, quantity: 10, discount: 0.25 },
];

const App = () => {
  return (
    <ProductProvider products={initialProductState}>
      <LastSelectedProvider>
        <Container />
      </LastSelectedProvider>
    </ProductProvider>
  );
};

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
