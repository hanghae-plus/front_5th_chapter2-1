import { useEffect, useState, useRef } from 'react';
import { Product } from '../../../types';
import { applyLightningSale, calculatePoints } from '../services';
import { products as initialProducts } from '../../../data';
import { calculateDiscount } from '../services/calculateDiscount';
import { setupIntervalWithDelay } from '../../../utils';
import { suggestProduct } from '../services/suggestProduct';

export const useCart = (
  lightningSaleInterval = 30000,
  lightningSaleDelay = Math.random() * 10000,
  suggestProductInterval = 60000,
  suggestProductDelay = Math.random() * 20000
) => {
  const [productsOptions, setProductsOptions] = useState<Product[]>(initialProducts);
  const productsOptionsRef = useRef(productsOptions);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [lastSelectedItemId, setLastSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    productsOptionsRef.current = productsOptions;
  }, [productsOptions]);

  const addToCart = (selectedProduct: Product | null, amount = 1) => {
    const product = productsOptionsRef.current.find(
      (product) => product.id === selectedProduct?.id
    );

    setLastSelectedItemId(product?.id ?? null);

    if (product) {
      if (product.stock > 0) {
        const newProductOptions = productsOptionsRef.current.map((item) =>
          item.id === product.id ? { ...item, stock: item.stock - amount } : item
        );
        setProductsOptions(newProductOptions);

        if (cartItems.map((item) => item.id).includes(product.id)) {
          setCartItems(
            cartItems.map((item) =>
              item.id === product.id ? { ...item, stock: item.stock + amount } : item
            )
          );
        } else {
          setCartItems([...cartItems, { ...product, stock: 1 }]);
        }
      } else {
        alert('재고가 부족합니다.');
      }
    }
  };

  const removeFromCart = (productId: string) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
  };

  const increaseQuantity = (productId: string, amount = 1) => {
    const selectedProduct = cartItems.find((item) => item.id === productId);

    if (selectedProduct) {
      addToCart(selectedProduct, amount);
    }
  };

  const decreaseQuantity = (productId: string, amount = 1) => {
    const selectedProduct = cartItems.find((item) => item.id === productId);
    if (selectedProduct) {
      const newStock = selectedProduct.stock - amount;
      if (newStock <= 0) {
        // 재고가 0 이하가 되면 cartItems에서 제거
        removeFromCart(productId);
      } else {
        // 재고가 남아 있으면 수량 업데이트
        setCartItems(
          cartItems.map((item) => (item.id === productId ? { ...item, stock: newStock } : item))
        );
      }
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const { totalAmount, calculatedDiscountRate } = calculateDiscount(cartItems);

      setTotalPrice(totalAmount);
      setDiscountRate(calculatedDiscountRate * 100);
      setBonusPoints(calculatePoints(totalAmount));
    } else {
      setTotalPrice(0);
      setBonusPoints(0);
      setDiscountRate(0);
    }
  }, [cartItems]);

  // 할인이 진행되면
  // -> 옵션 할인 적용
  // -> 카트 아이템에도 적용
  useEffect(() => {
    const lightningSaleIntervalId = setupIntervalWithDelay(
      () => applyLightningSale(productsOptionsRef.current, setProductsOptions),
      lightningSaleInterval,
      lightningSaleDelay
    );

    return () => clearInterval(lightningSaleIntervalId);
  }, []);

  useEffect(() => {
    const intervalId = setupIntervalWithDelay(
      () => {
        suggestProduct(productsOptionsRef.current, lastSelectedItemId, setProductsOptions);
      },
      suggestProductInterval,
      suggestProductDelay
    );

    return () => clearInterval(intervalId);
  }, [lastSelectedItemId, productsOptionsRef]);

  return {
    cartItems,
    totalPrice,
    bonusPoints,
    discountRate,
    productsOptions,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
};
