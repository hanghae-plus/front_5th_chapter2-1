import CartPage from './page/cart-page';
import { calculateCart, calculateDiscountRate } from './service/cart';
import {
    updateLuckyItemSale,
    renderProductPrice,
    updateLastSelectedSale,
    updateLastSelectedItem,
} from './service/product';
import { getProductById } from './utils/cart';
import { renderCartSection, renderProductSection } from './utils/render';

function main() {
    const $root = document.getElementById('app');
    $root.innerHTML = CartPage();

    // 관련 모든 상태를 초기화합니다.
    updateLastSelectedItem();
    renderProductPrice();

    const { totalPrice, totalItemCount, subTotalPrice } = calculateCart();
    const discountRate =  calculateDiscountRate(totalPrice, totalItemCount, subTotalPrice)

    renderCartSection(totalPrice, discountRate)
    renderProductSection()

    // 랜덤 럭키 상품 세일을 Interval로 등록합니다.
    setTimeout(function () {
        setInterval(updateLuckyItemSale(), 30000);
    }, Math.random() * 10000);

    // 마지막 선택 상품 세일을 Interval로 등록합니다.
    setTimeout(function () {
        setInterval(updateLastSelectedSale(), 60000);
    }, Math.random() * 20000);
}

main();

const $addItemButton = document.getElementById('add-to-cart');
const $cartContainer = document.getElementById('cart-items');

$addItemButton.addEventListener('click', function () {
    const $productSelect = document.getElementById('product-select');

    const selectedItemId = $productSelect.value;
    const itemToAdd = getProductById(selectedItemId)

    if (itemToAdd && !!itemToAdd.stock) {
        const $cartItem = document.getElementById(itemToAdd.id);

        if ($cartItem) {
            const currentCount = $cartItem.querySelector('span').textContent.split('x ')[1];
            const newCount = parseInt(currentCount) + 1;

            if (newCount <= itemToAdd.stock) {
                $cartItem.querySelector('span').textContent = `${itemToAdd.name} - ${itemToAdd.price} 원 x ${newCount}`;
                itemToAdd.stock--;
            } else {
                alert('재고가 부족합니다.');
            }
        } else {
            const newItem = document.createElement('div');
            newItem.id = itemToAdd.id;
            newItem.className = 'flex justify-between items-center mb-2';

            const newItemInformation = `<span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>`;
            const minusItemButton = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>`;
            const plusItemButton = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>`;
            const removeItemButton = `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>`;

            newItem.innerHTML = `<div>${newItemInformation}${minusItemButton}${plusItemButton}${removeItemButton}</div>`;

            $cartContainer.appendChild(newItem);
            itemToAdd.stock--;
        }
        const { totalPrice, totalItemCount, subTotalPrice } = calculateCart();
        const discountRate = calculateDiscountRate(totalPrice, totalItemCount, subTotalPrice )

        renderCartSection(totalPrice, discountRate)
        renderProductSection()
        updateLastSelectedItem(selectedItemId);
    }
});

$cartContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
        const productId = target.dataset.productId;
        const $itemElement = document.getElementById(productId);

        const currentItemName = $itemElement.querySelector('span').textContent.split('x ')[0];
        const currentItemCount = parseInt($itemElement.querySelector('span').textContent.split('x ')[1]);

        const prodduct = getProductById(productId)

        if (target.classList.contains('quantity-change')) {
            const quantityChange = parseInt(target.dataset.change);
            const newItemCount = currentItemCount + quantityChange;

            if (newItemCount > 0 && newItemCount <= prodduct.stock + currentItemCount) {
                $itemElement.querySelector('span').textContent = currentItemName + 'x ' + newItemCount;
                prodduct.stock -= quantityChange;
            } else if (newItemCount <= 0) {
                $itemElement.remove();
                prodduct.stock -= quantityChange;
            } else {
                alert('재고가 부족합니다.');
            }
        } else if (target.classList.contains('remove-item')) {
            const removedQuantity = currentItemCount;

            prodduct.stock += removedQuantity;
            $itemElement.remove();
        }
        const { totalPrice, totalItemCount, subTotalPrice } = calculateCart();
        const discountRate = calculateDiscountRate(totalPrice, totalItemCount, subTotalPrice)

        renderCartSection(totalPrice, discountRate)
        renderProductSection()
    }
});
