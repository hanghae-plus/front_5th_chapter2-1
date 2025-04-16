const initialProducts = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

const state = {
  lastSelected: null,
  products: JSON.parse(JSON.stringify(initialProducts)), // 깊은 복사 수행
  totalAmount: 0,
  cartItemCount: 0,
};
// 최대 재고 상수 추가
const MAXIMUM_STOCKS = initialProducts.map((product) => ({
  id: product.id,
  stock: product.stock,
}));

export { state, initialProducts, MAXIMUM_STOCKS };
