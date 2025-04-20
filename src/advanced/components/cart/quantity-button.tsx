import { Product } from 'src/advanced/config/types';
import { useStock } from '../../context/stock';
import { useCallback } from 'react';

interface CartQuantityButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  step: number;
  label: string;
}

export const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({
  product,
  step,
  label,
  ...props
}) => {
  const { dispatch } = useStock();

  const handleClickButton = useCallback(() => {
    const canChange =
      product.cartQuantity + step >= 0 && product.stockQuantity - step >= 0;

    if (!canChange) {
      alert('재고가 부족합니다.');
      return;
    }

    dispatch({ type: step > 0 ? 'INCREMENT' : 'DECREMENT', id: product.id });
  }, [dispatch, product, step]);

  return (
    <button
      className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
      data-product-id={product.id}
      data-change={step}
      onClick={handleClickButton}
      {...props}
    >
      {label}
    </button>
  );
};
