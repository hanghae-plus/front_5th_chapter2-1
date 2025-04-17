import { useMemo } from 'react';
import { discountRateMap } from '../constants/product';
import type { CartItem, Product } from '../types';

export interface CartTotals {
  total: number;
  rate: number;
  points: number;
}

export function useCartTotals(cart: CartItem[], products: Product[]): CartTotals {
  return useMemo(() => calculateCartTotals(cart, products), [cart, products]);
}

function calculateCartTotals(cart: CartItem[], products: Product[]): CartTotals {
  let original = 0;
  let discounted = 0;
  let count = 0;

  for (const { id, quantity } of cart) {
    const product = products.find((p) => p.id === id);
    if (!product) continue;

    const subtotal = product.price * quantity;
    const itemDiscount = quantity >= 10 ? (discountRateMap[id] ?? 0) : 0;

    original += subtotal;
    discounted += subtotal * (1 - itemDiscount);
    count += quantity;
  }

  if (count >= 30) {
    const maxBulk = original * 0.75;
    if (discounted > maxBulk) discounted = maxBulk;
  }

  const isTuesday = new Date().getDay() === 2;
  if (isTuesday) {
    discounted *= 0.9;
  }

  const rate = original > 0 ? (original - discounted) / original : 0;
  return {
    total: Math.round(discounted),
    rate,
    points: Math.floor(discounted / 1000),
  };
}
