import { products } from './constants';
import { render } from './render';
import { calculateTotalPrice } from './services/calculateTotalPrice';
import { updateSelectOption } from './services/updateSelectOption';

let lastSelected;

function main() {
    render();

    updateSelectOption(products);
    calculateTotalPrice(products);

    setTimeout(function () {
        setInterval(function () {
            const luckyItem = products[Math.floor(Math.random() * products.length)];

            if (!luckyItem) {
                console.log();
            }

            if (Math.random() < 0.3 && luckyItem.quantity > 0) {
                luckyItem.price = Math.round(luckyItem.price * 0.8);
                alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
                updateSelectOption(products);
            }
        }, 30000);
    }, Math.random() * 10000);

    setTimeout(function () {
        setInterval(function () {
            if (lastSelected) {
                const suggest = products.find(function (item) {
                    return item.id !== lastSelected && item.quantity > 0;
                });

                if (suggest) {
                    alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                    suggest.price = Math.round(suggest.price * 0.95);
                    updateSelectOption();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
}

main();

/** 상품 추가 */
const $addBtn = document.getElementById('add-to-cart');
$addBtn.addEventListener('click', function () {
    const $select = document.getElementById('product-select');
    const selectedItem = $select.value;
    const itemToAdd = products.find(function (product) {
        return product.id === selectedItem;
    });

    if (itemToAdd && itemToAdd.quantity > 0) {
        const $item = document.getElementById(itemToAdd.id);
        if ($item) {
            const currentQuantity = parseInt($item.querySelector('span').textContent.split('x ')[1]) + 1;

            if (currentQuantity <= itemToAdd.quantity) {
                $item.querySelector('span').textContent =
                    itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + currentQuantity;
                itemToAdd.quantity--;
            } else {
                alert('재고가 부족합니다.');
            }
        } else {
            const $newItem = document.createElement('div');

            $newItem.id = itemToAdd.id;
            $newItem.className = 'flex justify-between items-center mb-2';
            $newItem.innerHTML = /*HTML*/ `
        <span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span><div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;

            const $cartItem = document.getElementById('cart-items');
            $cartItem.appendChild($newItem);
            itemToAdd.quantity--;
        }

        calculateTotalPrice(products);
        lastSelected = selectedItem;
    }
});

/** 상품 제거 및 재고 현황 업데이트 */
const $cartItem = document.getElementById('cart-items');
$cartItem.addEventListener('click', function (event) {
    const $target = event.target;
    const isQuantityChanger = $target.classList.contains('quantity-change');
    const isRemoveButton = $target.classList.contains('remove-item');

    if (isQuantityChanger || isRemoveButton) {
        const productId = $target.dataset.productId;
        const $item = document.getElementById(productId);
        const selectedProduct = products.find(function (p) {
            return p.id === productId;
        });

        if (isQuantityChanger) {
            const quantityChange = parseInt($target.dataset.change);
            const currentQuantity = parseInt($item.querySelector('span').textContent.split('x ')[1]) + quantityChange;

            if (
                currentQuantity > 0 &&
                currentQuantity <=
                    selectedProduct.quantity + parseInt($item.querySelector('span').textContent.split('x ')[1])
            ) {
                $item.querySelector('span').textContent =
                    $item.querySelector('span').textContent.split('x ')[0] + 'x ' + currentQuantity;
                selectedProduct.quantity -= quantityChange;
            } else {
                alert('재고가 부족합니다.');
            }
        } else if (isRemoveButton) {
            $item.remove();
        }

        calculateTotalPrice(products);
    }
});
