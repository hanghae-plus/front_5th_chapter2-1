export interface CartState {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export interface ProductState {
  selectedProduct: {
    id: string;
    name: string;
    price: number;
    stock: number;
  } | null;
}