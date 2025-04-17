import {state} from "../store/state.js";

export const handleQuantityChange = (target) => {

    const productId = target.dataset.productId;
    const quantityChange = parseInt(target.dataset.change);

    const itemEl = document.getElementById(productId);
    const currentQuantity = parseInt(itemEl.querySelector('span').textContent.split('x ')[1]) + quantityChange;
    const newQuantity = currentQuantity + quantityChange;

    const product = state.products.find(p => p.id === productId);
    const availableStock = product.q + currentQuantity;

    if (newQuantity > availableStock) {
        alert('재고가 부족합니다.');
        return;
    }

    if (newQuantity <= 0) {
        itemEl.remove();
    } else {
        itemEl.querySelector('span').textContent = `${product.name} - ${product.val}원 x ${newQuantity}`;
    }

    product.q -= quantityChange;
    calcCart();
};

const handleRemoveItem = (target) => {

    const productId = target.dataset.productId;
    const itemEl = document.getElementById(productId);
    const product = state.products.find(p => p.id === productId);
    const quantity = parseInt(itemEl.querySelector('span').textContent.split('x ')[1], 10);

    product.q += quantity;
    itemEl.remove();

    calcCart();
};

const handleCartDisplayClick = (event) => {

    const {target} = event;

    if (target.classList.contains('quantity-change')) {
        handleQuantityChange(target);
    }
    if (target.classList.contains('remove-item')) {
        handleRemoveItem(target);
    }

}

export const initCartDisplayEvents = () => {
    state.elements.cartDisplay.addEventListener('click', handleCartDisplayClick);
};