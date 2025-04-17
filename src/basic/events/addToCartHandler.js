import {state} from "../store/state.js";
import {calcCart} from "../components/totalDisplay.js";

const handleAddToCart = () => {
    const selectedId = state.elements.select.value;
    const selectedProduct = state.products.find(p => p.id === selectedId)

    if (!selectedProduct || selectedProduct.q <= 0) {
        alert('재고가 부족합니다.');
        return;
    }
    const existingItem = document.getElementById(selectedId);

    if (existingItem) {
        updateExistingCartItem(existingItem, selectedProduct);
    } else {
        createNewCartItem(selectedProduct);
    }

    calcCart();
    state.lastSelected = selectedId;
}

const updateExistingCartItem = (itemElem, product) => {

    const currentQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1], 10);
    const newQty = currentQty + 1;

    if (newQty > product.q + currentQty) {
        alert('재고가 부족합니다.');
        return;
    }

    itemElem.querySelector('span').textContent =
        `${product.name} - ${product.val}원 x ${newQty}`;
    product.q--;
};

const createNewCartItem = (product) => {
    const newItem = document.createElement('div');
    newItem.id = product.id;
    newItem.className = 'flex justify-between items-center mb-2';

    newItem.innerHTML = `
    <span>${product.name} - ${product.val}원 x 1</span>
    <div> 
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button> +
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button> +
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button>
    </div>;
    `

    state.elements.cartDisplay.appendChild(newItem);
    product.q--;
}

export const initAddToCartHandler = () => {
    const addBtn = state.elements.addBtn;
    if (!addBtn) {
        console.log('addBtn 아직 렌더링 전');
        return;
    }

    addBtn.addEventListener('click', handleAddToCart);
};
   