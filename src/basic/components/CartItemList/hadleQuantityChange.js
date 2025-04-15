export const handleQuantityChange = (productElement, product, change, messages) => {
    const span = productElement.querySelector('span');
    const currentQuantity = parseInt(span.textContent.split('x ')[1]);
    const newQuantity = currentQuantity + change;

    // 현재 재고 + 현재 장바구니 수량 계산
    const maxQty = product.quantity + currentQuantity;

    if (newQuantity > 0 && newQuantity <= maxQty) {
        span.textContent = `${product.name} - ${product.val}원 x ${newQuantity}`;
        product.quantity -= change;
    } else if (newQuantity <= 0) {
        productElement.remove();
        product.quantity += currentQuantity;
    } else {
        alert(messages.OUT_OF_STOCK);
    }
}
