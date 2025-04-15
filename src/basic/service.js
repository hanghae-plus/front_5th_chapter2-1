/** 여기에 discount 값을 넣는게 좋을찌? */
export const PRODUCTS = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50, discount: 0.1 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30, discount: 0.15 },
  { id: 'p3', name: '상품3', price: 30000, stock: 3, discount: 0.2 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0, discount: 0.05 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10, discount: 0.25 },
];

/** 장바구니 목록 가져오기 */
export const getCarts = () => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  return carts.map(({ id, counts }) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return {
      id,
      name: product?.name || '이름 없음',
      price: product?.price || 0,
      counts,
    };
  });
};

export const updateQuantitiyCarts = ({ id, action }) => {
  let carts = getCarts();

  const product = carts.find((item) => item.id === id);
  if (!product) return;

  if (action === 'add') {
    product.counts += 1;
  } else if (action === 'subtract') {
    product.counts -= 1;
    if (product.counts <= 0) {
      carts = carts.filter((item) => item.id !== id);
    }
  }
  localStorage.setItem('carts', JSON.stringify(carts));
};

export const setCarts = ({ id, carts }) => {
  const product = carts.find((v) => v.id === id);

  if (!product) {
    const newCart = { id: id, counts: 1 };
    carts.push(newCart);
  } else {
    product.counts++;
  }
  localStorage.setItem('carts', JSON.stringify(carts));
};
