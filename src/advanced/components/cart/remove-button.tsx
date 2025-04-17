import { useProductList } from '../../context/product';
import { Product } from 'src/advanced/data/products';

interface CartRemoveButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  cart: Product;
}

export const CartRemoveButton: React.FC<CartRemoveButtonProps> = ({
  cart,
  ...props
}) => {
  const { cartList, setProductList } = useProductList();

  return (
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
                    stockQuantity: product.stockQuantity + product.cartQuantity,
                  }
                : product,
            ),
          );
        }
      }}
      {...props}
    >
      삭제
    </button>
  );
};
