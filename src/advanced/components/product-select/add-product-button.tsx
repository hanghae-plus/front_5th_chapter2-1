import { useSelect } from '../../context/select';
import { useStock } from '../../context/stock';

interface AddProductButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AddProductButton: React.FC<AddProductButtonProps> = (props) => {
  const { dispatch, stockList, setLastAddedProductId } = useStock();
  const { selectedId } = useSelect();

  return (
    <button
      id="add-to-cart"
      data-testid="add-to-cart"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => {
        const productToAdd = stockList.find(
          (product) => product.id === selectedId,
        );
        if (!productToAdd) {
          return;
        }

        if (productToAdd.stockQuantity > 0) {
          dispatch({ type: 'INCREMENT', id: productToAdd.id });
          setLastAddedProductId(productToAdd.id);
        } else {
          alert('재고가 부족합니다.');
        }
      }}
    >
      추가
    </button>
  );
};
