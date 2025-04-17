import { CART } from "../../const";
import type { GlobalState } from "../../types";
interface TotalPriceProps {
  target: HTMLElement;
  initialState: GlobalState;
}

export function TotalPrice({ target, initialState }: TotalPriceProps) {
  this.element = document.createElement("div");

  target.appendChild(this.element);

  this.element.id = CART.TOTAL_PRICE.ID;
  this.element.className = CART.TOTAL_PRICE.STYLE;

  this.state = initialState;
  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
      this.render();
    }
  };

  this.render = () => {
    this.element.innerHTML = `총액: ${this.state.totalPrice}원${(this.state.totalDiscountRate * 10) / 10 > 0 ? `<span class=${CART.DISCOUNT_RATE.STYLE}>(${(this.state.totalDiscountRate * 100).toFixed(1)}% 할인 적용)</span>` : ""}<span id=${CART.LOYALTY_POINTS.ID} class=${CART.LOYALTY_POINTS.STYLE}>(포인트: ${Math.round((this.state.totalPrice / 1000) * 10) / 10})</span>
    `;
  };

  this.render();
}
