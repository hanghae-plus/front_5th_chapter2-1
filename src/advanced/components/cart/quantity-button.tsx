import { useStock } from '../../context/stock';
import { Product } from 'src/advanced/data/products';

interface CartQuantityButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  cart: Product;
  step: number;
  label: string;
}

export const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({
  cart,
  step,
  label,
  ...props
}) => {
  const { cartList, setProductList } = useStock();

  return (
    <button
      className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
      data-product-id={cart.id}
      data-change={step}
      onClick={() => {
        const productToUpdate = cartList.find(
          (product) => product.id === cart.id,
        );

        if (!productToUpdate) {
          return;
        }

        const canChange =
          productToUpdate.cartQuantity + step >= 0 &&
          productToUpdate.stockQuantity - step >= 0;

        if (!canChange) {
          alert('재고가 부족합니다.');
          return;
        }

        setProductList((prev) =>
          prev.map((product) =>
            product.id === productToUpdate.id
              ? {
                  ...product,
                  cartQuantity: Math.max(product.cartQuantity + step, 0),
                  stockQuantity: Math.max(product.stockQuantity - step, 0),
                }
              : product,
          ),
        );
      }}
      {...props}
    >
      {label}
    </button>
  );
};
