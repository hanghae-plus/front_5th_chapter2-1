import { useEffect, useRef } from 'react';
import { Product } from '../types';

interface UsePromotionEffectsProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  lastSelectedProductId: string;
}

export const usePromotionEffects = ({
  setProducts,
  lastSelectedProductId,
}: UsePromotionEffectsProps) => {
  const lightningInterval = useRef<NodeJS.Timeout | null>(null);
  const suggestionInterval = useRef<NodeJS.Timeout | null>(null);

  // 번개 세일
  useEffect(() => {
    const delay = Math.random() * 10000;

    const timeout = setTimeout(() => {
      lightningInterval.current = setInterval(() => {
        setProducts(prev => {
          const index = Math.floor(Math.random() * prev.length);
          const lucky = prev[index];

          if (Math.random() < 0.3 && lucky.quantity > 0) {
            alert(`번개세일! ${lucky.name}이(가) 20% 할인 중입니다!`);

            const updated = [...prev];

            updated[index] = {
              ...lucky,
              price: Math.round(lucky.price * 0.8),
            };

            return updated;
          }
          return prev;
        });
      }, 30000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (lightningInterval.current) clearInterval(lightningInterval.current);
    };
  }, [setProducts]);

  // 추천 세일
  useEffect(() => {
    if (!lastSelectedProductId) return;

    const delay = Math.random() * 20000;

    const timeout = setTimeout(() => {
      suggestionInterval.current = setInterval(() => {
        setProducts(prev => {
          const suggestion = prev.find(
            p => p.id !== lastSelectedProductId && p.quantity > 0
          );

          if (suggestion) {
            alert(
              `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`
            );

            return prev.map(p =>
              p.id === suggestion.id
                ? { ...p, price: Math.round(p.price * 0.95) }
                : p
            );
          }

          return prev;
        });
      }, 60000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (suggestionInterval.current) clearInterval(suggestionInterval.current);
    };
  }, [lastSelectedProductId, setProducts]);
};
