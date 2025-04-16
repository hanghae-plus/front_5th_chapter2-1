import React from 'react';

const App: React.FC = () => {
  return (
    <>
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items"></div>
        <div id="cart-total" className="text-xl font-bold my-4"></div>
        <select id="product-select" className="border rounded p-2 mr-2"></select>
        <button type="button" id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        <div id="stock-status" className="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
    </>
  );
};

export default App;