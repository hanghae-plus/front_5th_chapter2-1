import { messages } from '../messages/messages.js';

export const CartItemList = (cartItemListElement, productList, calculationCart) => {

    function handleQuentityChange(eventTarget, productList) {
        const productId = eventTarget.dataset.productId;
        const productElement = document.getElementById(productId);
        const product = productList.find(function (p) { return p.id === productId; });
        if (eventTarget.classList.contains('quantity-change')) {
            const quantityChange = parseInt(eventTarget.dataset.change);
            const newQuantity = parseInt(productElement.querySelector('span').textContent.split('x ')[1]) + quantityChange;
            if (newQuantity > 0 && newQuantity <= product.quantity + parseInt(productElement.querySelector('span').textContent.split('x ')[1])) {
                productElement.querySelector('span').textContent = productElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
                product.quantity -= quantityChange;
            } else if (newQuantity <= 0) {
                productElement.remove();
                product.quantity -= quantityChange;
            } else {
                alert(messages.OUT_OF_STOCK);
            }

        }
    }

    function handleRemoveItem(productList) {
        const productElement = document.getElementById(productId);
        const product = productList.find(function (p) { return p.id === productId; });
        const removeQuantity = parseInt(productElement.querySelector('span').textContent.split('x ')[1]);
        product.quantity += removeQuantity;
        productElement.remove();
    };

    cartItemListElement.addEventListener('click', function (event) {
        const eventTarget = event.target;
        if (eventTarget.classList.contains('quantity-change') || eventTarget.classList.contains('remove-item')) {
            handleQuentityChange(eventTarget, productList);
        } else if (eventTarget.classList.contains('remove-item')) {
            handleRemoveItem(productList);
        }
        calculationCart();
    });

}
