interface HeaderProps {
  target: HTMLElement;
}

export function Header({ target }: HeaderProps) {
  this.element = document.createElement("h1");
  this.element.className = "text-2xl font-bold mb-4";
  this.element.textContent = "장바구니";
  target.appendChild(this.element);
}
