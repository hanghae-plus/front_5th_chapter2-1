import { useCartStore } from "../../hooks/useCart";
import React from "react";

export const ProductSelect = () => {
  const { productList, addToCart } = useCartStore();

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectElement = document.getElementById(
      "product-select",
    ) as HTMLSelectElement;
    const selectedId = selectElement.value;

    if (selectedId) {
      addToCart(selectedId);
    }
  };

  return (
    <div>
      <select
        id="product-select"
        name="product-select"
        className="mr-2 rounded border p-2"
      >
        {productList.map((product) => (
          <option
            key={product.id}
            id={product.id}
            disabled={product.stock === 0}
            value={product.id}
          >
            {product.name} - {product.price}원
          </option>
        ))}
      </select>
      <button
        type="button"
        id="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddToCartClick}
      >
        추가
      </button>
    </div>
  );
};
