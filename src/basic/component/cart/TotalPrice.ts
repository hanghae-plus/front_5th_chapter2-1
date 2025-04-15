import type { GlobalState } from "../../state/globalState";

interface TotalPriceProps {
  target: HTMLElement;
  initialState: GlobalState;
}

export function TotalPrice({ target, initialState }: TotalPriceProps) {
  this.element = document.createElement("div");
  this.element.id = "cart-total";
  this.element.className = "text-xl font-bold my-4";

  this.state = initialState;

  target.appendChild(this.element);

  this.render = () => {
    this.element.innerHTML = `총액: ${this.state.totalPrice}원${this.state.totalDiscountRate > 0 ? `<span class="text-green-500 ml-2">(${this.state.totalDiscountRate * 100}% 할인 적용)</span>` : ""}<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${this.state.totalPrice / 1000})</span>
    `;
  };

  this.render();
}
