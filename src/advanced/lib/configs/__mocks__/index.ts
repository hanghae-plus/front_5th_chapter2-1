import type { Product } from "@advanced/lib/types";

export const PRODUCT_INVENTORY: Product[] = [
  { id: "p1", name: "상품1", price: 100, stock: 100 },
  { id: "p2", name: "상품2", price: 200, stock: 100 },
  { id: "p3", name: "상품3", price: 300, stock: 100 },
];

export const BULK_DISCOUNT_THRESHOLD = 30;
export const BONUS_POINT_RATE = 0.1;

export const DISCOUNT_RATES = {
  tuesday: 0.1,
  bulk: 0.25,
  regular: 0.1,
};
export const DISCOUNT_RATES_BY_PRODUCT = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
};
