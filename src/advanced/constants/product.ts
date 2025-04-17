import type { Product } from '../types';

export const defaultProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, units: 50 },
  { id: 'p2', name: '상품2', price: 20000, units: 30 },
  { id: 'p3', name: '상품3', price: 30000, units: 20 },
  { id: 'p4', name: '상품4', price: 15000, units: 0 },
  { id: 'p5', name: '상품5', price: 25000, units: 10 },
];

export const discountRateMap: Record<string, number> = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

export const STOCK_WARNING_THRESHOLD = 5;
