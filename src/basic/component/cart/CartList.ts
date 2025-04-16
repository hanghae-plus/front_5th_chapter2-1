export function CartList() {
  this.element = document.createElement("div");
  this.element.id = "cart-list";
  this.element.className = "flex flex-col gap-2";
  return this.element;
}
