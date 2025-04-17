export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  productId: string;
  quantity: number; // 장바구니에 담긴 수량
}
