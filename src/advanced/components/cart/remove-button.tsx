import { Product } from 'src/advanced/config/types';
import { useStock } from '../../context/stock';
import { useCallback } from 'react';

interface CartRemoveButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  product: Product;
}

export const CartRemoveButton: React.FC<CartRemoveButtonProps> = ({
  product,
  ...props
}) => {
  const { dispatch } = useStock();
  const handleClickButton = useCallback(
    () => dispatch({ type: 'REMOVE', id: product.id }),
    [dispatch, product.id],
  );

  return (
    <button
      className="remove-item bg-red-500 text-white px-2 py-1 rounded"
      data-product-id={product.id}
      onClick={handleClickButton}
      {...props}
    >
      삭제
    </button>
  );
};
