import { messages } from '../messages/messages .js';

export const ProductSelector = (productSelectElement, addToCartButtonElement, productList, cartItemList, calculationCart, lastSelectedProduct) => {
    function createProductOption(product) {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - ${product.val}원`;
        if (product.quantity === 0) {
            option.disabled = true;
        }
        return option;

    };

    /* 상품 선택 옵션 업데이트 */
    function updateSelectOptions() {
        productSelectElement.innerHTML = ''; // 기존 옵션 제거
        const fragment = document.createDocumentFragment();// 미리 fragment에 담아 한 번에 추가(리플로우 최소화)
        productList.forEach(product => {
            fragment.appendChild(createProductOption(product));
        })
        productSelectElement.appendChild(fragment); // 새로운 옵션 추가
    };

    /* 새 카트 아이템 생성 */
    function createNewCartItem(itemToAdd) {
        const newItem = document.createElement('div');
        newItem.id = itemToAdd.id;
        newItem.className = 'flex justify-between items-center mb-2';
        newItem.innerHTML = `<span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>
            <div>
                <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
                <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
                <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
            </div>`;
        return newItem;
    };

    /* 상품 존재 여부 */
    function updateExistingCartItem(existingItem, itemToAdd) {
        const span = existingItem.querySelector('span');
        const newQuantity = parseInt(span.textContent.split('x ')[1]) + 1;
        if (newQuantity <= itemToAdd.quantity) {
            span.textContent = `${itemToAdd.name} - ${itemToAdd.val}원 x ${newQuantity}`;
            itemToAdd.quantity--;
        } else { alert(messages.OUT_OF_STOCK); }
    };


    addToCartButtonElement.addEventListener('click', function () {
        const selectItem = productSelectElement.value;
        const itemToAdd = productList.find(function (product) { return product.id === selectItem; });

        // 수량이 0 이하이면 얼럿 띄우고 리턴
        if (!itemToAdd || itemToAdd.quantity <= 0) {
            alert(messages.OUT_OF_STOCK);
            return;
        }
        const existingItem = document.getElementById(itemToAdd.id);

        if (existingItem) {
            updateExistingCartItem(existingItem, itemToAdd);
        } else {
            const newItem = createNewCartItem(itemToAdd);
            cartItemList.appendChild(newItem);
            itemToAdd.quantity--;
        }
        calculationCart();
        lastSelectedProduct = selectItem;
    });

    return { updateSelectOptions }
};

