import { useState } from 'react';
import { useCart, useProducts } from '../../context';
import { useTimer, SECOND, MINUTE } from '../../lib/hooks/useTimer';

const Promotions: React.FC = () => {
  const [flashSaleProduct, setFlashSaleProduct] = useState<string | null>(null);
  const [suggestedProduct, setSuggestedProduct] = useState<string | null>(null);

  const { getRandomProduct, getSuggestedProduct, applyDiscount } = useProducts();
  const { cart } = useCart();

  const flashSale = () => {
    const luckyItem = getRandomProduct();

    if (luckyItem && Math.random() < 0.3 && luckyItem.quantity > 0) {
      applyDiscount(luckyItem.id, 0.2);
      setFlashSaleProduct(luckyItem.name);

      alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
    }
  };

  const suggestProduct = () => {
    const lastSelectedProductId = cart.lastSelectedProductId;

    if (lastSelectedProductId) {
      const suggest = getSuggestedProduct(lastSelectedProductId);

      if (suggest) {
        setSuggestedProduct(suggest.name);
        applyDiscount(suggest.id, 0.05);

        alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      }
    }
  };

  useTimer(flashSale, 30 * SECOND, 10 * SECOND);
  useTimer(suggestProduct, 1 * MINUTE, 20 * SECOND);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      {flashSaleProduct && (
        <div className="mb-2">
          <h3 className="font-bold">플래시 세일!</h3>
          <p>{flashSaleProduct}이(가) 20% 할인 중입니다!</p>
        </div>
      )}

      {suggestedProduct && (
        <div>
          <h3 className="font-bold">추천 상품:</h3>
          <p>{suggestedProduct}은(는) 어떠세요? 5% 추가 할인 중!</p>
        </div>
      )}
    </div>
  );
};

export default Promotions;
