import React from "react";
import { createRoot } from "react-dom/client";
import ProductSection from "./components/ProductSection";

const App = () => {
    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <h1 className="text-2xl font-bold mb-4">장바구니</h1>
                <div id="advance-cart-items"></div>
                <div id="advance-cart-total" className="text-xl font-bold my-4"></div>
                <ProductSection />
                <div id="advance-stock-status" className="text-sm text-gray-500 mt-2"></div>
            </div>
        </div>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
