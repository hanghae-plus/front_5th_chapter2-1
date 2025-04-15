// 상품 셀렉 + 버튼

export const ProductSelector = (productSelectElement, addToCartButtonElement, stockStatusElement, productList, cartItemList, calculationCart, lastSelectedProduct) => {
    // productSelectElement.addEventListener('change', function (event) {
    //     const selectedProductId = event.target.value;
    //     const selectedProduct = productList.find(product => product.id === selectedProductId);
    //     if (selectedProduct) {
    //         addToCartButtonElement.dataset.productId = selectedProductId;
    //         stockStatusElement.textContent = selectedProduct.quantity > 0 ? '재고 있음' : '재고 없음';
    //     }
    // });
    function createProductOption(product) {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - ${product.val}원`;
        if (product.quantity === 0) {
            option.disabled = true;
        }
        return option;

    }

    /* 상품 선택 옵션 업데이트 */
    function updateSelectOptions() {
        productSelectElement.innerHTML = ''; // 기존 옵션 제거
        const fragment = document.createDocumentFragment();// 미리 fragment에 담아 한 번에 추가(리플로우 최소화)
        productList.forEach(product => {
            fragment.appendChild(createProductOption(product));
        })
        productSelectElement.appendChild(fragment); // 새로운 옵션 추가
    }

    addToCartButtonElement.addEventListener('click', function () {
        var selItem = productSelectElement.value;
        var itemToAdd = productList.find(function (p) { return p.id === selItem; });
        if (itemToAdd && itemToAdd.quantity > 0) {
            var item = document.getElementById(itemToAdd.id);
            if (item) {
                var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
                if (newQty <= itemToAdd.quantity) {
                    item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
                    itemToAdd.quantity--;
                } else { alert('재고가 부족합니다.'); }
            } else {
                var newItem = document.createElement('div');
                newItem.id = itemToAdd.id;
                newItem.className = 'flex justify-between items-center mb-2';
                newItem.innerHTML = '<span>' + itemToAdd.name + ' - ' + itemToAdd.val + '원 x 1</span><div>' +
                    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
                    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
                    '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
                cartItemList.appendChild(newItem);
                itemToAdd.quantity--;
            }
            calculationCart();
            lastSelectedProduct = selItem;
        }
    });

    return { updateSelectOptions }
}