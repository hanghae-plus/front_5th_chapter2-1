export interface Product {
  id: string; // 상품 ID
  name: string; // 상품명
  val: number; // 상품 가격
  quantity: number; // 상품 재고 수량
}

// export type CartItemValue = Pick<Product, "name" | "val" | "quantity">;

// 상품 목록을 정의합니다.
export const PRODUCTS: Product[] = [
  { id: "p1", name: "상품1", val: 10000, quantity: 50 },
  { id: "p2", name: "상품2", val: 20000, quantity: 30 },
  { id: "p3", name: "상품3", val: 30000, quantity: 20 },
  { id: "p4", name: "상품4", val: 15000, quantity: 0 },
  { id: "p5", name: "상품5", val: 25000, quantity: 10 },
];
