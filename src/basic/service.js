/** 여기에 discount 값을 넣는게 좋을찌? */
export const PRODUCTS = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50, discount: 0.1 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30, discount: 0.15 },
  { id: 'p3', name: '상품3', price: 30000, stock: 3, discount: 0.2 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0, discount: 0.05 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10, discount: 0.25 },
];

/** 장바구니 목록 ui 가져오기 */
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

export const updateQuantitiyCarts = ({ id, action }) => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const product = carts.find((item) => item.id === id);

  if (!product) return;

  if (action === 'add') {
    product.quantity += 1;
  } else if (action === 'subtract') {
    if (product.quantity <= 1) {
      updatedCarts = carts.filter((cart) => cart.id !== id);
      console.log('-----삭제되고 업데이트-----');
      console.log(updatedCarts);
      console.log('-----삭제되고 업데이트-----');
    }
    product.quantity -= 1;
    if (product.quantity <= 0) {
      carts = carts.filter((item) => item.id !== id);
    }
  }
  localStorage.setItem('carts', JSON.stringify(carts));
};

export const setCarts = ({ id, carts }) => {
  const product = carts.find((cart) => cart.id === id);

  if (!product) {
    const newCart = { id: id, quantity: 1 };
    carts.push(newCart);
  } else {
    product.quantity++;
  }
  localStorage.setItem('carts', JSON.stringify(carts));
};

/**
 * 장바구니 목록 추가 함수
 * @id 추가할 상품의 id
 */
export const addCart = ({ id }) => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const addTarget = carts.find((cart) => cart.id === id);

  if (!!addTarget) {
    const updatedCarts = carts.map((cart) =>
      cart.id === id ? { id: id, quantity: addTarget.quantity + 1 } : cart,
    );
    localStorage.setItem('carts', JSON.stringify(updatedCarts));

    return { carts: updatedCarts };
  } else {
    const AddedCarts = [...carts, { id: id, quantity: 1 }];
    localStorage.setItem('carts', JSON.stringify(AddedCarts));

    return { carts: AddedCarts };
  }
};

/** 장바구니 수량 업데이트 */
export const updateCartQuantity = ({ id, quantity }) => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const updatedCarts = carts.map((cart) =>
    cart.id === id ? { id: id, quantity: quantity + 1 } : cart,
  );

  localStorage.setItem('carts', JSON.stringify(updatedCarts));
};
