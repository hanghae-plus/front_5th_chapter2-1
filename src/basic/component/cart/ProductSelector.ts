import type { GlobalState } from "../../types";

interface ProductSelectorProps {
  target: HTMLElement;
  initialState: GlobalState;
  handleButtonClick: (productId: string) => void;
}

export function ProductSelector({ target, initialState, handleButtonClick }: ProductSelectorProps) {
  this.select = document.createElement("select");
  this.addButton = document.createElement("button");
  this.state = initialState;

  this.select.id = "product-selector";
  this.select.className = "border rounded p-2 mr-2";

  this.addButton.id = "add-to-cart";
  this.addButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
  this.addButton.textContent = "추가";

  target.appendChild(this.select);
  target.appendChild(this.addButton);

  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
      this.render();
    }
  };

  this.render = () => {
    this.select.innerHTML = this.state.productList
      .map(
        (product) =>
          `<option value="${product.id}" ${product.count <= 0 ? "disabled = true" : ""}>${product.name} - ${product.price}원</option>`,
      )
      .join("");
  };

  this.render();

  this.addButton.addEventListener("click", () => {
    const selectedProductId = this.select.value;
    console.log(selectedProductId);
    handleButtonClick(selectedProductId);
  });
}
