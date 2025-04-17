import { useEffect } from 'react';
import { Product } from '../types';

export const useSale = (
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    selectedProductId: string
) => {
    const applyFlashSale = () => {
        const availableProducts = products.filter((p) => p.quantity > 0);
        if (availableProducts.length === 0) return;

        const luckyItem = availableProducts[Math.floor(Math.random() * availableProducts.length)];
        if (Math.random() < 0.3) {
            setProducts((prev) =>
                prev.map((p) => (p.id === luckyItem.id ? { ...p, price: Math.round(p.price * 0.8) } : p))
            );
            alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        }
    };

    const applyRecommendationSale = () => {
        if (selectedProductId) {
            const suggest = products.find((item) => item.id !== selectedProductId && item.quantity > 0);
            if (suggest) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === suggest.id ? { ...p, price: Math.round(p.price * 0.95) } : p))
                );
                alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
            }
        }
    };

    useEffect(() => {
        const scheduleRandomEvent = (eventHandler: () => void, interval: number, randomDelay: number) => {
            const delay = Math.random() * randomDelay;
            setTimeout(() => {
                setInterval(eventHandler, interval);
            }, delay);
        };

        scheduleRandomEvent(applyFlashSale, 30000, 10000);
        scheduleRandomEvent(applyRecommendationSale, 60000, 20000);
    }, []);

    return { applyFlashSale, applyRecommendationSale };
};
