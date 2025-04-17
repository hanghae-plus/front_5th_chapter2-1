import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/cart-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
