import { Product } from 'src/advanced/data/products';
import { CartItemSummary } from './summary';
import { useProductList } from '../../context/product';
import { CartQuantityButton } from './quantity-button';

interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  cart: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ cart, ...props }) => {
  const { cartList, setProductList } = useProductList();

  return (
    <div
      key={cart.id}
      id={cart.id}
      className="flex justify-between items-center mb-2"
      {...props}
    >
      <CartItemSummary cart={cart} />
      <div>
        <CartQuantityButton step={-1} label="-" cart={cart} />
        <CartQuantityButton step={1} label="+" cart={cart} />
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={cart.id}
          onClick={() => {
            const productToRemove = cartList.find(
              (product) => product.id === cart.id,
            );
            if (productToRemove) {
              setProductList((prev) =>
                prev.map((product) =>
                  product.id === productToRemove.id
                    ? {
                        ...product,
                        cartQuantity: 0,
                        stockQuantity:
                          product.stockQuantity + product.cartQuantity,
                      }
                    : product,
                ),
              );
            }
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
