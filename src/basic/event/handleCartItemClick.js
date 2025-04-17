import { state } from '../store/state';

import calculateCart from '../feature/calculateCart';

export default function handleCartItemClick(event) {
    const targetElement = event.target;
    const { productList } = state;

    if (!targetElement.classList.contains('quantity-change') && !targetElement.classList.contains('remove-item'))
        return;

    const productId = targetElement.dataset.productId;
    const cartItemElement = document.getElementById(productId);
    const product = productList.find((p) => p.id === productId);

    if (!cartItemElement || !product) return;

    const currentQuantity = parseInt(cartItemElement.querySelector('span').textContent.split('x ')[1]);

    if (targetElement.classList.contains('quantity-change')) {
        const quantityChange = parseInt(targetElement.dataset.change);
        const newQuantity = currentQuantity + quantityChange;

        if (newQuantity > 0 && newQuantity <= product.q + currentQuantity) {
            cartItemElement.querySelector('span').textContent =
                cartItemElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
            product.q -= quantityChange;
        } else if (newQuantity <= 0) {
            cartItemElement.remove();
            product.q += currentQuantity;
        } else {
            alert('재고가 부족합니다.');
        }
    }

    if (targetElement.classList.contains('remove-item')) {
        product.q += currentQuantity;
        cartItemElement.remove();
    }

    calculateCart();
}
