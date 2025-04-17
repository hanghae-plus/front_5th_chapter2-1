import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export function useSuggestionSale() {
  const { selectedId, products, setProducts } = useCartStore();

  useEffect(() => {
    if (!selectedId || products.length === 0) return;

    const delay = Math.random() * 20000; // 첫 제안 랜덤 지연
    const intervalId = setTimeout(() => {
      const timer = setInterval(() => {
        const suggestion = products.find(
          (item) => item.id !== selectedId && item.q > 0
        );

        if (suggestion) {
          alert(
            `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`
          );
          suggestion.val = Math.round(suggestion.val * 0.95); // 할인 적용

          // 상태 업데이트 (새 배열로)
          setProducts([...products]);
        }
      }, 60000); // 1분마다 제안

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(intervalId);
  }, [selectedId, products, setProducts]);
}
