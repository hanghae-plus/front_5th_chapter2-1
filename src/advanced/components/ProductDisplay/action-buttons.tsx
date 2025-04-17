import { ActionType, useCartControls } from '../../context';

interface Props {
  productId: string;
}

export const ActionButtons = ({ productId }: Props) => {
  const { handleActionProduct, handleRemoveProduct } = useCartControls();

  const handleChangeProductQuantity = (action: ActionType) => {
    handleActionProduct(productId, action);
  };

  return (
    <div>
      <button
        onClick={() => handleChangeProductQuantity('DECREASE')}
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        -
      </button>
      <button
        onClick={() => handleChangeProductQuantity('INCREASE')}
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        +
      </button>
      <button
        onClick={() => handleRemoveProduct(productId)}
        className="remove-item bg-red-500 text-white px-2 py-1 rounded"
      >
        삭제
      </button>
    </div>
  );
};
