import { createElement } from "../hooks/createElement";

const Header = createElement(
    'h1',
    { className: 'text-2xl font-bold mb-4', 
      textContent: `장바구니`
    }
);

export { Header };