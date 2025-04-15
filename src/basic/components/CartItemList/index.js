import { messages } from '../../messages/messages.js';
import { handleQuantityChange } from './hadleQuantityChange.js';
import { handleRemoveItem } from './handleRemoveItem.js';

export const CartItemList = (cartItemListElement, productList, calculationCart) => {
    cartItemListElement.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.dataset.productId) return;

        const productId = target.dataset.productId;
        const productElement = document.getElementById(productId);
        const product = productList.find(p => p.id === productId);
        if (!product || !productElement) return;

        if (target.classList.contains('quantity-change')) {
            const change = parseInt(target.dataset.change);
            handleQuantityChange(productElement, product, change, messages);
        } else if (target.classList.contains('remove-item')) {
            handleRemoveItem(productElement, product);
        }

        calculationCart();
    });
};
