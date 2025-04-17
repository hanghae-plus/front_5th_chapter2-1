export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  lastSelectedProductId: string | null;
  totalAmount: number;
  itemCount: number;
  items: CartItem[];
}
