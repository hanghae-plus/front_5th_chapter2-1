import React from 'react';
import { Product } from '../types/product';
import { calculateCartTotal, getStockStatus } from '../utils/calculateCart';

export interface CartTotalResult {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}

export interface StockStatus {
  name: string;
  quantity: number;
  status: 'normal' | 'low' | 'soldOut';
}

export const calculateCartTotal = (products: Product[]): CartTotalResult => {
  let totalPrice = 0;
  let totalProductCount = 0;
  let totalPriceBeforeDiscount = 0;

  products.forEach((product) => {
    totalProductCount += product.quantity;
    const productTotalPrice = product.price * product.quantity;
    totalPriceBeforeDiscount += productTotalPrice;
    totalPrice += calculateProductDiscount(product, product.quantity);
  });

  let totalCartDiscountRate = calculateCartDiscount(
    totalPrice,
    totalPriceBeforeDiscount,
    totalProductCount,
  );

  const tuesdayDiscount = calculateTuesdayDiscount(totalPrice, totalCartDiscountRate);

  totalPrice = tuesdayDiscount.price;
  totalCartDiscountRate = tuesdayDiscount.discountRate;

  const bonusPoints = Math.floor(totalPrice / 1000);

  return {
    totalPrice,
    discountRate: totalCartDiscountRate,
    bonusPoints,
  };
};

export const getStockStatus = (products: Product[]): StockStatus[] => {
  return products.map(({ name, quantity }) => ({
    name,
    quantity,
    status: quantity === 0 ? 'soldOut' : quantity < 5 ? 'low' : 'normal',
  }));
};

export interface CartTotalProps {
  totalPrice: number;
  discountRate: number;
  bonusPoints: number;
}

export const CartTotal: React.FC<CartTotalProps> = ({ totalPrice, discountRate, bonusPoints }) => {
  return (
    <div>
      <div className="cart-total">
        <span>총액: {Math.round(totalPrice)}원</span>
        {discountRate > 0 && (
          <span className="text-green-500 ml-2">
            ({(discountRate * 100).toFixed(1)}% 할인 적용)
          </span>
        )}
        <span className="text-blue-500 ml-2">(포인트: {bonusPoints})</span>
      </div>
    </div>
  );
};
