import { CART } from "../../constants";
import type { GlobalState } from "../../types";
interface SoldOutListProps {
  target: HTMLElement;
  initialState: GlobalState;
}

export function SoldOutList({ target, initialState }: SoldOutListProps) {
  this.element = document.createElement("div");
  this.element.id = CART.SOLD_OUT_LIST.ID;
  this.element.className = CART.SOLD_OUT_LIST.STYLE;
  target.appendChild(this.element);

  this.state = initialState;

  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
      this.render();
    }
  };

  this.render = () => {
    const soldOutList = this.state.productList.filter((item) => item.count < 5);

    this.element.textContent = ` ${soldOutList
      .map((item) => (item.count === 0 ? `${item.name}: 품절` : `${item.name} 재고 부족 (${item.count}개 남음)`))
      .join("")}`;
  };
}
