// hooks/usePromotion.ts
import { useEffect } from "react";
import { Product } from "../types";

export function usePromotion(
    productList: Product[],
    lastSelected: string | null,
    updateProducts: (newProducts: Product[]) => void
) {
    useEffect(() => {
        // 번개세일 타이머
        const flashSaleTimer = setTimeout(() => {
            const flashSaleInterval = setInterval(() => {
                const randomIndex = Math.floor(
                    Math.random() * productList.length
                );
                const flashSaleProduct = { ...productList[randomIndex] };

                if (Math.random() < 0.3 && flashSaleProduct.q > 0) {
                    const updatedProducts = productList.map((p) =>
                        p.id === flashSaleProduct.id
                            ? { ...p, val: Math.round(p.val * 0.8) }
                            : p
                    );

                    alert(
                        `번개세일! ${flashSaleProduct.name}이(가) 20% 할인 중입니다!`
                    );
                    updateProducts(updatedProducts);
                }
            }, 300000);

            return () => clearInterval(flashSaleInterval);
        }, Math.random() * 100000);

        // 제안세일 타이머
        const suggestionTimer = setTimeout(() => {
            const suggestionInterval = setInterval(() => {
                if (lastSelected) {
                    const suggest = productList.find(
                        (item) => item.id !== lastSelected && item.q > 0
                    );

                    if (suggest) {
                        const updatedProducts = productList.map((p) =>
                            p.id === suggest.id
                                ? { ...p, val: Math.round(p.val * 0.95) }
                                : p
                        );

                        alert(
                            `${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`
                        );
                        updateProducts(updatedProducts);
                    }
                }
            }, 60000);

            return () => clearInterval(suggestionInterval);
        }, Math.random() * 2000);

        // 컴포넌트 언마운트 시 정리
        return () => {
            clearTimeout(flashSaleTimer);
            clearTimeout(suggestionTimer);
        };
    }, [productList, lastSelected, updateProducts]);
}
