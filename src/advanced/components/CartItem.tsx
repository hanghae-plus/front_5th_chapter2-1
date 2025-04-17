export default function CartItem({ selectedItem, cartCount }) {
  return (
    <div id={selectedItem.id} className="flex justify-between items-center mb-2">
      <span>
        {selectedItem.name} - {selectedItem.price}원 x {cartCount}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={selectedItem.id}
          data-change="-1"
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={selectedItem.id}
          data-change="1"
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={selectedItem.id}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
