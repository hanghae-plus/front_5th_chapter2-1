import { Product } from '../types/product';

interface CartListProps {
  cartItems: Product[];
  onCartItemClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const CartList = ({ cartItems, onCartItemClick }: CartListProps) => {
  return (
    <div className="mb-4" onClick={onCartItemClick}>
      {cartItems.map((item) => (
        <div key={item.id} id={item.id} className="flex justify-between items-center mb-2">
          <span className="text-gray-700">
            {item.name} - {item.price}원 x {item.quantity}
          </span>
          <div>
            <button
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={item.id}
              data-change="-1"
            >
              -
            </button>
            <button
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={item.id}
              data-change="1"
            >
              +
            </button>
            <button
              className="remove-item bg-red-500 text-white px-2 py-1 rounded"
              data-product-id={item.id}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
