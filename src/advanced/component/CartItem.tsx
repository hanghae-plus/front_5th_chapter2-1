import { Product } from "../types";
export default (prod: Product) => {
  const { id, name, price, cart } = prod;
  return (
    <div id={id} className="flex justify-between items-center mb-2">
      <span>{name + " - " + price + "원 x " + cart}</span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-change="-1"
          data-product-id={id}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-change="1"
          data-product-id={id}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={id}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
