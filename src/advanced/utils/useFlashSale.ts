import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export function useFlashSale() {
  const { products, setProducts } = useCartStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        const available = products.filter((p) => p.q > 0);
        if (available.length === 0) return;

        const luckyItem =
          available[Math.floor(Math.random() * available.length)];

        if (Math.random() < 0.3) {
          const newProducts = products.map((p) =>
            p.id === luckyItem.id ? { ...p, val: Math.round(p.val * 0.8) } : p
          );

          alert(`⚡ 번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          setProducts(newProducts);
        }
      }, 30000);

      // 클린업
      return () => clearInterval(intervalId);
    }, Math.random() * 10000);

    // 클린업 타이머
    return () => clearTimeout(timeoutId);
  }, [products, setProducts]);
}
