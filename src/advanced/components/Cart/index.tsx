import { ProductSelect } from '../ProductSelect';
import { useCartControls } from '../../context';
import { ProductDisplay } from '../ProductDisplay';
import { RemainProductList } from '../RemainProductDisplay';
import { ProductSummaryDisplay } from '../ProductSummaryDisplay';

export const Cart = () => {
  const { cart } = useCartControls();

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8 p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      {cart && <ProductDisplay />}
      <ProductSummaryDisplay />
      <ProductSelect />
      <RemainProductList />
    </div>
  );
};
