import { useCart, useProducts } from '../../context';

const CartItem: React.FC<{ productId: string; quantity: number }> = ({ productId, quantity }) => {
  const { getProductById, updateQuantity } = useProducts();
  const { updateCartItem, removeFromCart } = useCart();

  const product = getProductById(productId);

  if (!product) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;

    const isValidQuantity = newQuantity > 0 && newQuantity <= product.quantity + quantity;

    if (isValidQuantity) {
      updateCartItem(productId, newQuantity);
      updateQuantity(productId, -change);
    } else if (newQuantity <= 0) {
      removeFromCart(productId);
      updateQuantity(productId, quantity);
    } else {
      alert('재고가 부족합니다.');
    }
  };

  const handleRemove = () => {
    removeFromCart(productId);
    updateQuantity(productId, quantity);
  };

  return (
    <div id={productId} className="flex justify-between items-center mb-2">
      <span>
        {product.name} - {product.price}원 x {quantity}
      </span>

      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={productId}
          data-change="-1"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={productId}
          data-change="1"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={productId}
          onClick={handleRemove}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
