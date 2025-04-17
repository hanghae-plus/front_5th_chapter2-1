import { createElement } from "../hooks/createElement";

const TotalPrice = createElement(
    'div',
    { id: 'cart-total',
      className: 'text-xl font-bold my-4'
    }
);

export { TotalPrice };