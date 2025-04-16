import { Product } from '../types';

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (change: number) => void;
  onRemove: () => void;
}

const CartItem = ({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  return (
    <div id={product.id} className="flex justify-between items-center mb-2">
      <span>
        {product.name} - {product.price.toLocaleString()}원 x {quantity}
      </span>
      <div className="flex gap-1">
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onQuantityChange(-1)}
          data-product-id={product.id}
          data-change="-1"
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onQuantityChange(1)}
          data-product-id={product.id}
          data-change="1"
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          onClick={onRemove}
          data-product-id={product.id}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
