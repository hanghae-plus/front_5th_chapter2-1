import { useEffect } from "react";
import { PRODUCT } from "../context/interface";

interface UseSaleAlertsProps {
  products: PRODUCT[];
  setProducts: React.Dispatch<React.SetStateAction<PRODUCT[]>>;
  lastSelectedId?: string;
}

function useSaleAlerts({ products, setProducts, lastSelectedId }: UseSaleAlertsProps) {
  useEffect(() => {
    const discountTimer = setInterval(() => {
      const lucky = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && lucky.stock > 0) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === lucky.id ? { ...p, price: Math.round(p.price * 0.8) } : p
          )
        );
        alert(`번개세일! ${lucky.name}이(가) 20% 할인 중입니다!`);
      }
    }, 30000);

    const recommandTimer = setInterval(() => {
      if (lastSelectedId) {
        const suggestion = products.find((p) => p.id !== lastSelectedId && p.stock > 0);
        if (suggestion) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === suggestion.id ? { ...p, price: Math.round(p.price * 0.95) } : p
            )
          );
          alert(`${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        }
      }
    }, 60000);

    return () => {
      clearInterval(discountTimer);
      clearInterval(recommandTimer);
    };
  }, [products, setProducts, lastSelectedId]);
}

export { useSaleAlerts };