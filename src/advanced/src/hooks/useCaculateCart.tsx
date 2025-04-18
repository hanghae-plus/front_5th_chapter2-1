import { useEffect, useState } from "react";
import { DAY, DISCOUNT_RATE, NUMBER_OF_BULK, Product } from "../constants";

type CartItems = Record<string, Product>;

export const useCaculateCart = (cartItems: CartItems) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [point, setPoint] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);

  function calculateCart(cartItems: CartItems) {
    const {
      discountedPrice,
      totalQuantity: quantity,
      totalPrice: price,
    } = calcQuantityAndPrice(cartItems);

    // 총 할인 계산
    let discountRate = 0;
    discountRate = getBulkDiscountRate(quantity, discountedPrice, price);
    (discountRate * 100).toFixed(1);
    setDiscountRate(discountRate);

    // 총 가격 계산
    setTotalPrice(Math.min(price * (1 - discountRate), discountedPrice));

    // 보너스 포인트 계산
    const bonusPoint = Math.floor(discountedPrice / 1000);
    setPoint(bonusPoint);
  }

  // 장바구니에 있는 모든 상품의 수량과 가격을 계산.
  function calcQuantityAndPrice(cartItems: CartItems) {
    let discountedPrice = 0;
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const cartItem of Object.values(cartItems)) {
      const { id, quantity, val } = cartItem;

      // 현재 수량 계산
      if (quantity > 0) {
        totalQuantity += quantity;
      }

      // product별 가격 계산
      const sumProductPrice = val * quantity;
      if (sumProductPrice > 0) {
        totalPrice += sumProductPrice;
      }

      // product별 할인 계산
      let discount = 0;
      if (quantity >= 10) {
        discount = getDiscountRate(id as keyof typeof DISCOUNT_RATE);
      }

      // 할인 적용 가격 계산
      discountedPrice += sumProductPrice * (1 - discount);
    }

    return { discountedPrice, totalQuantity, totalPrice };
  }

  // bulk수량 & 화요일 할인율 계산.
  function getBulkDiscountRate(
    quantity: number,
    discountedPrice: number,
    price: number
  ) {
    let discountRate = 0;
    if (typeof quantity !== "number" || typeof discountedPrice !== "number") {
      return 0;
    }
    if (quantity === 0 || discountedPrice === 0 || price === 0) {
      return 0;
    }

    // 기본 할인율
    discountRate = calculateDiscountRate(discountedPrice, price);

    // bulk 수량인 경우 bulk 할인율 적용
    if (quantity >= NUMBER_OF_BULK) {
      discountRate = caculateBulkDiscountRate(quantity, discountedPrice, price);
    }

    // 특정요일 할인 check 후 할인율 적용
    discountRate = calculateDayDiscountRate(discountedPrice, discountRate);
    return discountRate;
  }

  function calculateDiscountRate(discountedPrice: number, price: number) {
    return (price - discountedPrice) / price;
  }

  function caculateBulkDiscountRate(
    quantity: number,
    discountedPrice: number,
    price: number
  ) {
    let discountRate = 0;
    if (quantity >= NUMBER_OF_BULK) {
      const bulkDiscountedPrice = discountedPrice * DISCOUNT_RATE.BULK;
      const discount = price - discountedPrice;
      if (bulkDiscountedPrice > discount) {
        discountedPrice = price * (1 - DISCOUNT_RATE.BULK);
        discountRate = DISCOUNT_RATE.BULK;
      }
    }

    return discountRate;
  }

  function calculateDayDiscountRate(
    discountedPrice: number,
    discountRate: number
  ) {
    let _discountRate = discountRate;
    if (new Date().getDay() === DAY.TUESDAY) {
      // 가격에 화요일 할인율 적용
      discountedPrice *= 1 - DISCOUNT_RATE.TUESDAY;

      // 화요일 할인율과 기존 할인율 중 큰 값으로 설정
      _discountRate = Math.max(discountRate, DISCOUNT_RATE.TUESDAY);
    }

    return _discountRate;
  }

  function getDiscountRate(key: keyof typeof DISCOUNT_RATE) {
    return DISCOUNT_RATE[key] || 0;
  }

  useEffect(() => {
    if (Object.keys(cartItems).length === 0) return;
    calculateCart(cartItems);
  }, [cartItems]);

  return {
    totalPrice,
    point,
    discountRate,
  };
};
