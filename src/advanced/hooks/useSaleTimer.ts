import { useEffect, useRef, useState } from "react";
import { Product } from "advanced/types/product";
import { messages } from "../constants/constants";



export const useSaleTimer = (
    productList: Product[],
    setProductList: (product: Product[]) => void,
    lastSelectedProduct: Product | null) => {

    const lightningSaleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const recommendationTimerRef = useRef<NodeJS.Timeout | null>(null);

    const getRandomProduct = (products: Product[]) => {
        const availableProducts = products.filter(p => p.stock > 0);
        return availableProducts[Math.floor(Math.random() * availableProducts.length)];
    }
    const startLightningSale = () => {
        lightningSaleTimerRef.current = setInterval(() => {
            const random = getRandomProduct(productList);
            if (!random) return;

            const updated = productList.map(p =>
                p.id === random.id ? { ...p, price: Math.round(p.price * 0.8) } : p
            );
            setProductList(updated);
            alert(messages.SALE_ALERT(random.name));
        }, 30000);
    };

    const startRecommendSale = () => {
        recommendationTimerRef.current = setInterval(() => {
            if (!lastSelectedProduct) return;

            const recommend = productList.find(
                p => p.id !== lastSelectedProduct.id && p.stock > 0
            );
            if (!recommend) return;

            const updated = productList.map(p =>
                p.id === recommend.id ? { ...p, price: Math.round(p.price * 0.95) } : p
            );
            setProductList(updated);
            alert(messages.SUGGESTION(recommend.name));
        }, 60000);
    };

    useEffect(() => {
        if (lightningSaleTimerRef.current) {
            clearInterval(lightningSaleTimerRef.current);
        }
        if (recommendationTimerRef.current) {
            clearInterval(recommendationTimerRef.current);
        }
        startLightningSale();
        startRecommendSale();
        return () => {
            if (lightningSaleTimerRef.current) {
                clearInterval(lightningSaleTimerRef.current);
            }
            if (recommendationTimerRef.current) {
                clearInterval(recommendationTimerRef.current);
            }
        }
    }, [productList, lastSelectedProduct]);

}
