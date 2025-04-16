import type { GlobalState } from "../../types";

interface CartListProps {
  target: HTMLElement;
  initialState: GlobalState;
}

export function CartList({ target, initialState }: CartListProps) {
  this.element = document.createElement("div");
  this.element.id = "cart-items";

  this.state = initialState;
  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
      this.render();
    }
  };

  this.render = () => {
    this.element.innerHTML = `
    ${this.state.cartList
      .map(
        (item) => `
         <div id="${item.id}" class="flex justify-between items-center mb-2">
         <span>${item.name} - ${item.price}원 x ${item.count}</span>
         <div>
       <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id=${item.id} data-change="-1">-</button>
       <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id=${item.id} data-change="1">+</button>
       <button id="remove-item" class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id=${item.id}>삭제</button>
       </div>
       </div>
       `,
      )
      .join("")}
    `;
  };

  target.appendChild(this.element);
}
