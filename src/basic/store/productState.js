// 상품 상태 관리 모듈
export const productState = () => {
  // 상품 객체들
  const p1 = { id: 'p1', name: '상품1', price: 10000, stock: 50 };
  const p2 = { id: 'p2', name: '상품2', price: 20000, stock: 30 };
  const p3 = { id: 'p3', name: '상품3', price: 30000, stock: 20 };
  const p4 = { id: 'p4', name: '상품4', price: 15000, stock: 0 };
  const p5 = { id: 'p5', name: '상품5', price: 25000, stock: 10 };

  // 모든 상품을 객체로 모음
  const products = { p1, p2, p3, p4, p5 };

  // 상품 ID로 상품 조회
  const getProduct = (productId) => {
    return products[productId] || null;
  };

  // 재고 조회
  const getStock = (productId) => {
    const product = getProduct(productId);
    return product ? product.stock : null;
  };

  // 재고 충분 여부 확인
  const hasEnoughStock = (productId, amount = 1) => {
    const product = getProduct(productId);
    return product && product.stock >= amount;
  };

  // 재고 업데이트
  const updateStock = (productId, amount) => {
    const product = getProduct(productId);
    if (!product) return false;

    product.stock += amount;
    return true;
  };

  // 재고 감소 (구매 시)
  const decreaseStock = (productId, amount = 1) => {
    const product = getProduct(productId);
    if (!product || product.stock < amount) {
      return false;
    }

    product.stock -= amount;
    return true;
  };

  // 재고 증가 (반품, 재입고 시)
  const increaseStock = (productId, amount = 1) => {
    const product = getProduct(productId);
    if (!product) return false;

    product.stock += amount;
    return true;
  };

  // 가격 업데이트
  const updatePrice = (productId, newPrice) => {
    const product = getProduct(productId);
    if (!product) return false;

    product.price = newPrice;
    return true;
  };

  // 모든 상품 정보 반환
  const getAllProducts = () => {
    return Object.values(products).map((p) => ({ ...p }));
  };

  // 노출할 함수들 반환
  return {
    // 상품 객체들
    p1,
    p2,
    p3,
    p4,
    p5,

    // 상품 접근 함수
    getProduct,
    getStock,
    hasEnoughStock,

    // 상품 상태 업데이트 함수
    updateStock,
    decreaseStock,
    increaseStock,
    updatePrice,

    // 정보 제공 함수
    getAllProducts,
  };
};

// 싱글톤으로 사용하기 위한 인스턴스 생성
export const ProductStore = productState();
