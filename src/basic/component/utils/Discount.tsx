import { createElement } from "../../hooks/createElement";

const Discount = (discountRate) => createElement(
    'span',
    { className: 'text-sm text-gray-500 mt-2', 
      textContent: `(${(discountRate*100).toFixed(1)}% 할인 적용)`
    }
);

export { Discount };