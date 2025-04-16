import { useAtom } from "jotai";
import { useState } from "react";
import { useAddToCart } from "../../hooks";
import { cartAtom } from "../../state";

export const ProductSelector = () => {
  const [cart] = useAtom(cartAtom);
  const [selectedProductId, setSelectedProductId] = useState(cart.productList.length > 0 ? cart.productList[0].id : "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(e.target.value);
  };

  const { handleAddToCart } = useAddToCart();

  return (
    <>
      <select className="border rounded p-2 mr-2" value={selectedProductId} onChange={handleChange}>
        {cart.productList.map((product) => (
          <option key={product.id} value={product.id} disabled={product.count <= 0}>
            {product.name} - {product.price}원
          </option>
        ))}
      </select>
      <button
        onClick={() => handleAddToCart(selectedProductId)}
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        추가
      </button>
    </>
  );
};
