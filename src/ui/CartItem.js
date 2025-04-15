// 장바구니
const cartItem = () => {
  const cartEl = document.createElement("div"); // div
  cartEl.id = "cart-items";

  // DOM에 추가하는 로직
  const render = (targetEl) => {
    targetEl.appendChild(cartEl);
  };

  return { element: cartEl, render };
};

export { cartItem };
