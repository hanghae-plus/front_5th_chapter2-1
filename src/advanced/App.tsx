import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/cart-page";

const App = () => {
  return (
    <BrowserRouter basename="/index.advanced.html">
      <Routes>
        <Route path="/" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
