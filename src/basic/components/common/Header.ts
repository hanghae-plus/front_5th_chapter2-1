import { HEADER } from "../../const";

interface HeaderProps {
  target: HTMLElement;
}

export function Header({ target }: HeaderProps) {
  this.element = document.createElement("h1");
  this.element.className = HEADER.STYLE;
  this.element.textContent = HEADER.TEXT;
  target.appendChild(this.element);
}
