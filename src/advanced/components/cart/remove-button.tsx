import { Product } from 'src/advanced/config/types';
import { useStock } from '../../context/stock';

interface CartRemoveButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  cart: Product;
}

export const CartRemoveButton: React.FC<CartRemoveButtonProps> = ({
  cart,
  ...props
}) => {
  const { cartList, dispatch } = useStock();

  return (
    <button
      className="remove-item bg-red-500 text-white px-2 py-1 rounded"
      data-product-id={cart.id}
      onClick={() => {
        const productToRemove = cartList.find(
          (product) => product.id === cart.id,
        );
        if (productToRemove) {
          dispatch({ type: 'REMOVE', id: cart.id });
        }
      }}
      {...props}
    >
      삭제
    </button>
  );
};
