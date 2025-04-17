import React from "react";
import { useCartContext } from "../context/CartProvider.jsx";
import { getProducts } from "../selectors/productSelectors.js";
const ProductSelect = ({ value, onChange }) => {
  const { state } = useCartContext();
  const products = getProducts(state);
  return (
    <select id="product-select" value={value} onChange={onChange} className="border rounded p-2 mr-2">
      {products.map((product) => (
        <option key={product.id} value={product.id} disabled={product.quantity === 0}>
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
