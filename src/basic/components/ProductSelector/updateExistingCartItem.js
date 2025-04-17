/* 상품 존재 여부 */
export const updateExistingCartItem = (existingItem, itemToAdd) => {
    const span = existingItem.querySelector('span');
    const newQuantity = parseInt(span.textContent.split('x ')[1]) + 1;
    if (newQuantity <= itemToAdd.quantity) {
        span.textContent = `${itemToAdd.name} - ${itemToAdd.val}원 x ${newQuantity}`;
        itemToAdd.quantity--;
    } else { alert(messages.OUT_OF_STOCK); }
}