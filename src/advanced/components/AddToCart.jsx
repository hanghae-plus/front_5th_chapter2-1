import React, { useState } from "react";
import { useCartContext } from "../context/CartProvider.jsx";
import ProductSelect from "./ProductSelect.jsx";
import { getProductById, getProducts } from "../selectors/productSelectors.js";
import { getCartItemById } from "../selectors/cartSelectors.js";
import { addToCart, setLastSelected, updateCartItem, updateCartTotals } from "../actions/cartActions.js";
import { updateProductStock } from "../actions/productActions.js";

const AddToCart = () => {
  const { state, dispatch } = useCartContext();
  const products = getProducts(state);

  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id ?? "p1");

  const handleProductSelect = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const product = getProductById(state, selectedProduct);
    if (!product || product.quantity <= 0) return;

    const existingCartItem = getCartItemById(state, product.id);

    if (existingCartItem) {
      // 이미 장바구니에 있는 경우 수량 증가
      dispatch(updateCartItem(product.id, existingCartItem.quantity + 1));
    } else {
      // 새 상품 추가
      dispatch(addToCart(product, 1));
    }

    dispatch(updateProductStock(product.id, 1));
    dispatch(setLastSelected(product.id));
    dispatch(updateCartTotals());
  };

  return (
    <>
      <ProductSelect value={selectedProduct} onChange={handleProductSelect} />
      <button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
        추가
      </button>
    </>
  );
};

export default AddToCart;
