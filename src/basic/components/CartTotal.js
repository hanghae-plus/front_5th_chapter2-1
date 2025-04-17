import { createElement } from '../utils/createElement';

const CartTotal = () => {
    return createElement('div', {
        id: 'cart-total',
        className: 'text-xl font-bold my-4',
    });
};

export default CartTotal;
