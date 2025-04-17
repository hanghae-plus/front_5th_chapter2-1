import React from "react";
import { useCartContext } from "../context/CartProvider.jsx";
import { removeFromCart, updateCartItem, updateCartTotals } from "../actions/cartActions.js";
import { updateProductStock } from "../actions/productActions.js";

/**
 * 장바구니 아이템 컴포넌트
 * @param {Object} product - 상품 정보 객체
 * @param {number} quantity - 상품의 수량
 */
const CartItem = ({ product, quantity }) => {
  const { dispatch } = useCartContext();
  const handleQuantityChange = (change) => {
    const updatedQuantity = quantity + change;

    if (updatedQuantity <= 0) {
      // 제품 삭제
      dispatch(removeFromCart(product.id));
      dispatch(updateProductStock(product.id, -quantity));
    } else if (updatedQuantity <= product.quantity + quantity) {
      // 수량 변경
      dispatch(updateCartItem(product.id, updatedQuantity));
      dispatch(updateProductStock(product.id, change));
    } else {
      alert("재고가 부족합니다.");
    }

    dispatch(updateCartTotals());
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(product.id));
    dispatch(updateProductStock(product.id, -quantity));
    dispatch(updateCartTotals());
  };

  return (
    <div id={product.id} className="flex justify-between items-center mb-2">
      <span>
        {product.name} - {product.price}원 x {quantity}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={product.id}
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={product.id}
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={product.id}
          onClick={handleRemoveItem}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
