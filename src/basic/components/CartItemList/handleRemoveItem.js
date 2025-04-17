export const handleRemoveItem = (productElement, product) => {
    const span = productElement.querySelector('span');
    const removeQuantity = parseInt(span.textContent.split('x ')[1]);

    product.quantity += removeQuantity;
    productElement.remove();
}
