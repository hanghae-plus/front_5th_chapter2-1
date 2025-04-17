import { Product } from '../types/product';

export interface StockStatus {
  name: string;
  quantity: number;
  status: 'normal' | 'low' | 'soldOut';
}

export const getStockStatus = (products: Product[]): StockStatus[] => {
  return products.map(({ name, quantity }) => ({
    name,
    quantity,
    status: quantity === 0 ? 'soldOut' : quantity < 5 ? 'low' : 'normal',
  }));
};
