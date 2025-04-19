import AddToCartButton from '@/components/add-to-cart-button';
import Carts from '@/components/carts';
import ProductSelect from '@/components/product-select';
import StockStatus from '@/components/stock-status';
import TotalPriceInfo from '@/components/total-price-Info';
import { useCartContext } from '@/context/cart-context';
import useLuckDraw from '@/hooks/use-luck-draw';
import useSuggestSale from '@/hooks/use-suggest-sale';
import { useEffect } from 'react';

export default function Main() {
  const { carts, setSelectedProductId, selectedProductId } = useCartContext();
  const { luckyItemAlert } = useLuckDraw();
  const { suggestProductAlert } = useSuggestSale(selectedProductId);

  useEffect(() => {
    luckyItemAlert();
    suggestProductAlert();
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <Carts carts={carts} />
        <TotalPriceInfo />
        <ProductSelect setSelectedProductId={setSelectedProductId} />
        <AddToCartButton />
        <StockStatus carts={carts} />
      </div>
    </div>
  );
}
