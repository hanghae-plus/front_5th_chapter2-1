/** 여기에 discount 값을 넣는게 좋을찌? */
export const PRODUCTS = [
  { id: 'p1', name: '상품1', price: 10000, stock: 10, discount: 0.1 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30, discount: 0.15 },
  { id: 'p3', name: '상품3', price: 30000, stock: 3, discount: 0.2 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0, discount: 0.05 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10, discount: 0.25 },
];

/** 장바구니 목록 ui 배열 가져오기 */
export const getCarts = () => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  return carts.map(({ id, quantity }) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return {
      id,
      name: product?.name || '이름 없음',
      price: product?.price || 0,
      quantity,
    };
  });
};

// + - 될때 변경되는거
export const updateCarts = ({ id, action }) => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];

  const product = carts.find((cart) => cart.id === id);
  const stockProduct = PRODUCTS.find((p) => p.id === id);
  if (!product || stockProduct) return;

  let updateCarts = [];

  switch (action) {
    case 'add':
      if (product.counts + 1 > stockProduct.stock) {
        alert('재고가 부족합니다.');
        return;
      }
      updateCarts = carts.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    case 'subtract':
      updateCarts = carts
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.counts > 0);
    default:
      return;
  }

  localStorage.setItem('carts', JSON.stringify(updateCarts));
};

/**
 * 장바구니에서 제거
 *  @id 삭제될 상품의 id
 */
export const deleteCart = ({ id }) => {
  const removedCarts = carts.filter((cart) => cart.id !== id);
  localStorage.setItem('carts', removedCarts);
  return { carts: removedCarts };
};

// add -> delete -> update 객체의 수량만 변경해주는 역할
// add () delte() update() setStogae

/**
 * 장바구니 수량 업데이트
 * @id - 수량이 변경된 상품의 id
 * @quantity - 기존 수량
 */

// 얘의 목적은 상품 추가를 눌렸을 때 이미 있는 애면 추가하는 로직
export const updateQuantity = ({ id, quantity }) => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const updatedCarts = carts.map((cart) =>
    cart.id === id ? { id: id, quantity: quantity + 1 } : cart,
  );

  localStorage.setItem('carts', JSON.stringify(updatedCarts));
};

export const getStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setStorageItem = (key, value) => localStorage.setItem(key, value);
