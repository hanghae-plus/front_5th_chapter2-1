import { CART } from "../../constants";
import type { CartItem, GlobalState } from "../../types";

interface ProductSelectorProps {
  target: HTMLElement;
  initialState: GlobalState;
  handleButtonClick: (productId: string) => void;
}

export function ProductSelector({ target, initialState, handleButtonClick }: ProductSelectorProps) {
  this.select = document.createElement("select");
  this.addButton = document.createElement("button");

  target.appendChild(this.select);
  target.appendChild(this.addButton);

  this.state = initialState;

  this.select.id = CART.PRODUCT_SELECTOR.ID;
  this.select.className = CART.PRODUCT_SELECTOR.STYLE;

  this.addButton.id = CART.ADD_BUTTON.ID;
  this.addButton.className = CART.ADD_BUTTON.STYLE;
  this.addButton.textContent = CART.ADD_BUTTON.TEXT;

  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
      this.render();
    }
  };

  this.render = () => {
    console.log("productList", this.state.productList);
    this.select.innerHTML = this.state.productList
      .map(
        (product: CartItem) =>
          `<option value="${product.id}" ${product.count <= 0 ? "disabled = true" : ""}>${product.name} - ${product.price}원</option>`,
      )
      .join("");
  };

  this.render();

  this.addButton.addEventListener("click", () => {
    const selectedProductId = this.select.value;
    handleButtonClick(selectedProductId);
  });
}
