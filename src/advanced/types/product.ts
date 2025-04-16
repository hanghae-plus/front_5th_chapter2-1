export interface Product {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

export type ProductList = Product[];