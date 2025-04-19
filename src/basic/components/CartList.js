import { getStore, updateStore } from "../store/store";

export const CartList = () => {
  return `<div id="cart-items"></div>`;
};

export const renderCartItems = () => {
  const { cartItems, products } = getStore();

  const cartElement = document.getElementById("cart-items");

  if (!cartElement) return;

  cartElement.innerHTML = "";

  Object.entries(cartItems).forEach(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    if (!product || quantity <= 0) return;

    const itemElement = document.createElement("div");
    itemElement.id = product.id;
    itemElement.className = "flex justify-between items-center mb-2";
    itemElement.innerHTML = `
      <span>${product.name} - ${product.val}원 x ${quantity}</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
      </div>
    `;
    cartElement.appendChild(itemElement);
  });
};

export const initCartEvents = () => {
  const cartElement = document.getElementById("cart-items");
  if (!cartElement) return;

  cartElement.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.classList.contains("quantity-change") && !target.classList.contains("remove-item"))
      return;

    const { cartItems, products } = getStore();
    const productId = target.dataset.productId;
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    if (target.classList.contains("quantity-change")) {
      const changeAmount = parseInt(target.dataset.change);
      const currentQuantity = cartItems[productId] || 0;
      const newQuantity = currentQuantity + changeAmount;

      if (newQuantity <= 0) {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[productId];
        updateStore({
          cartItems: updatedCartItems,
          products: products.map((p) =>
            p.id === productId ? { ...p, q: p.q + currentQuantity } : p
          )
        });
      } else if (changeAmount > 0 && product.q < changeAmount) {
        alert("재고가 부족합니다.");
      } else {
        updateStore({
          cartItems: {
            ...cartItems,
            [productId]: newQuantity
          },
          products: products.map((p) => (p.id === productId ? { ...p, q: p.q - changeAmount } : p))
        });
      }
    } else if (target.classList.contains("remove-item")) {
      const currentQuantity = cartItems[productId] || 0;
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[productId];

      updateStore({
        cartItems: updatedCartItems,
        products: products.map((p) => (p.id === productId ? { ...p, q: p.q + currentQuantity } : p))
      });
    }
  });
};
