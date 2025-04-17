export type CartItem = {
  productId: string;
  quantity: number;
};
export type Cart = CartItem[];

let cart: Cart = [];

function deepCopyCart(cart: Cart): Cart {
  return cart.map((item) => ({
    ...item,
  }));
}

export function deleteItemFromCart(cart: Cart, index: number): Cart {
  const cartCopy = deepCopyCart(cart);
  cartCopy.splice(index, 1);
  return cartCopy;
}

export function updateCart(newCart: Cart): void {
  cart = deepCopyCart(newCart);
}

export function getCart(): Cart {
  return deepCopyCart(cart);
}

export function addNewItemInCart(cart: Cart, productId: string): Cart {
  return [...deepCopyCart(cart), { productId, quantity: 1 }];
}

export function addExistingItemInCart(
  cart: Cart,
  productId: string,
  quantity: number = 1,
): Cart {
  const index = findItemIndex(cart, productId);
  return cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity + quantity } : item,
  );
}

export function findItemIndex(cart: Cart, productId: string): number {
  return cart.findIndex((cartItem) => cartItem.productId === productId);
}
