import { useCartControls } from '../../context';

interface Props {
  productId: string;
}

export const AddButton = ({ productId }: Props) => {
  const { handleActionProduct } = useCartControls();

  const handleClick = () => {
    handleActionProduct(productId, 'INCREASE');
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      추가
    </button>
  );
};
