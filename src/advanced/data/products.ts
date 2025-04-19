import { Product } from '../config/types';

export const INITIAL_PRODUCT_LIST: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stockQuantity: 50,
    cartQuantity: 0,
    discountRate: 0.1,
    discountThreshold: 10,
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stockQuantity: 30,
    cartQuantity: 0,
    discountRate: 0.15,
    discountThreshold: 10,
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stockQuantity: 20,
    cartQuantity: 0,
    discountRate: 0.2,
    discountThreshold: 10,
  },
  {
    id: 'p4',
    name: '상품4',
    price: 15000,
    stockQuantity: 0,
    cartQuantity: 0,
    discountRate: 0.05,
    discountThreshold: 10,
  },
  {
    id: 'p5',
    name: '상품5',
    price: 25000,
    stockQuantity: 10,
    cartQuantity: 0,
    discountRate: 0.25,
    discountThreshold: 10,
  },
];
