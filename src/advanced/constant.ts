import { ProductInfo } from "./types/types";
export const DISCOUNT_RATES: { [key: string]: number } = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

export const SALE_DAY = 2;

export const INITIAL_CART: ProductInfo[] = [
  { id: "p1", name: "상품1", price: 10000, stock: 50, quantity: 0 },
  { id: "p2", name: "상품2", price: 20000, stock: 30, quantity: 0 },
  { id: "p3", name: "상품3", price: 30000, stock: 20, quantity: 0 },
  { id: "p4", name: "상품4", price: 15000, stock: 0, quantity: 0 },
  { id: "p5", name: "상품5", price: 25000, stock: 10, quantity: 0 },
];
