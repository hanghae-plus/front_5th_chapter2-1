import { Product, CartItem } from '../types/product';

export const INITIAL_PRODUCTS: Product[] = [
    { id: 'p1', name: '상품1', price: 10000, stock: 50 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

export const DISCOUNT_RATES: Record<string, number> = {
    'p1': 0.1,
    'p2': 0.15,
    'p3': 0.2,
    'p4': 0.05,
    'p5': 0.25,
};
