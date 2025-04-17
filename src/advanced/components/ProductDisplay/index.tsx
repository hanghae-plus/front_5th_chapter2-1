import { useCartControls } from '../../context';
import { ProductItem } from '../ProductItem';
import { ActionButtons } from './action-buttons';

export const ProductDisplay = () => {
  const { cart } = useCartControls();

  return (
    <div>
      {cart.map((product) => (
        <div key={product.id} className="flex justify-between items-center mb-2">
          <ProductItem props={product} />
          <ActionButtons productId={product.id} />
        </div>
      ))}
    </div>
  );
};
