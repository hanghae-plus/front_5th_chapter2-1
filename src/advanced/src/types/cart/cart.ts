export interface CartItem {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface Cart {
  productList: Product[];
  cartList: CartItem[];
  totalPrice: number;
  totalDiscountRate: number;
  lastSelectedProduct: CartItem | null;
}
