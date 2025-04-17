let productList, productSelectElement, addToCartButton, cartItemsContainer, totalAmountElement, stockStatusElement;
let lastSelectedProductId,
    bonusPoints = 0,
    totalAmount = 0,
    totalItemCount = 0;

function main() {
    productList = [
        { id: 'p1', name: '상품1', val: 10000, q: 50 },
        { id: 'p2', name: '상품2', val: 20000, q: 30 },
        { id: 'p3', name: '상품3', val: 30000, q: 20 },
        { id: 'p4', name: '상품4', val: 15000, q: 0 },
        { id: 'p5', name: '상품5', val: 25000, q: 10 },
    ];

    const rootElement = document.getElementById('app');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const headingElement = document.createElement('h1');

    cartItemsContainer = document.createElement('div');
    totalAmountElement = document.createElement('div');
    productSelectElement = document.createElement('select');
    addToCartButton = document.createElement('button');
    stockStatusElement = document.createElement('div');

    cartItemsContainer.id = 'cart-items';
    totalAmountElement.id = 'cart-total';
    productSelectElement.id = 'product-select';
    addToCartButton.id = 'add-to-cart';
    stockStatusElement.id = 'stock-status';

    container.className = 'bg-gray-100 p-8';
    wrapper.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
    headingElement.className = 'text-2xl font-bold mb-4';
    totalAmountElement.className = 'text-xl font-bold my-4';
    productSelectElement.className = 'border rounded p-2 mr-2';
    addToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
    stockStatusElement.className = 'text-sm text-gray-500 mt-2';

    headingElement.textContent = '장바구니';
    addToCartButton.textContent = '추가';

    updateSelectOptions();

    wrapper.appendChild(headingElement);
    wrapper.appendChild(cartItemsContainer);
    wrapper.appendChild(totalAmountElement);
    wrapper.appendChild(productSelectElement);
    wrapper.appendChild(addToCartButton);
    wrapper.appendChild(stockStatusElement);
    container.appendChild(wrapper);
    rootElement.appendChild(container);

    calculateCart();

    // 이벤트 바인딩
    addToCartButton.addEventListener('click', handleAddToCart);
    cartItemsContainer.addEventListener('click', handleCartItemClick);

    // 이벤트 프로모션
    setTimeout(function () {
        setInterval(function () {
            const luckyItem = productList[Math.floor(Math.random() * productList.length)];
            if (Math.random() < 0.3 && luckyItem.q > 0) {
                luckyItem.val = Math.round(luckyItem.val * 0.8);
                alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
                updateSelectOptions();
            }
        }, 30000);
    }, Math.random() * 10000);

    setTimeout(function () {
        setInterval(function () {
            if (lastSelectedProductId) {
                const suggestedItem = productList.find((item) => item.id !== lastSelectedProductId && item.q > 0);
                if (suggestedItem) {
                    alert(suggestedItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                    suggestedItem.val = Math.round(suggestedItem.val * 0.95);
                    updateSelectOptions();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
}

function updateSelectOptions() {
    productSelectElement.innerHTML = '';
    productList.forEach(function (item) {
        const optionElement = document.createElement('option');
        optionElement.value = item.id;
        optionElement.textContent = `${item.name} - ${item.val}원`;
        if (item.q === 0) optionElement.disabled = true;
        productSelectElement.appendChild(optionElement);
    });
}

function calculateCart() {
    totalAmount = 0;
    totalItemCount = 0;
    const cartItems = cartItemsContainer.children;
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let currentItem;
        for (let j = 0; j < productList.length; j++) {
            if (productList[j].id === cartItems[i].id) {
                currentItem = productList[j];
                break;
            }
        }
        const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
        const itemTotal = currentItem.val * quantity;
        let discount = 0;
        totalItemCount += quantity;
        subtotal += itemTotal;
        if (quantity >= 10) {
            if (currentItem.id === 'p1') discount = 0.1;
            else if (currentItem.id === 'p2') discount = 0.15;
            else if (currentItem.id === 'p3') discount = 0.2;
            else if (currentItem.id === 'p4') discount = 0.05;
            else if (currentItem.id === 'p5') discount = 0.25;
        }
        totalAmount += itemTotal * (1 - discount);
    }

    let discountRate = 0;
    if (totalItemCount >= 30) {
        const bulkDiscount = totalAmount * 0.25;
        const itemDiscount = subtotal - totalAmount;
        if (bulkDiscount > itemDiscount) {
            totalAmount = subtotal * (1 - 0.25);
            discountRate = 0.25;
        } else {
            discountRate = (subtotal - totalAmount) / subtotal;
        }
    } else {
        discountRate = (subtotal - totalAmount) / subtotal;
    }

    if (new Date().getDay() === 2) {
        totalAmount *= 0.9;
        discountRate = Math.max(discountRate, 0.1);
    }

    totalAmountElement.textContent = `총액: ${Math.round(totalAmount)}원`;
    if (discountRate > 0) {
        const discountSpan = document.createElement('span');
        discountSpan.className = 'text-green-500 ml-2';
        discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
        totalAmountElement.appendChild(discountSpan);
    }

    updateStockStatus();
    renderBonusPoints();
}

function renderBonusPoints() {
    bonusPoints = Math.floor(totalAmount / 1000);
    let pointsElement = document.getElementById('loyalty-points');
    if (!pointsElement) {
        pointsElement = document.createElement('span');
        pointsElement.id = 'loyalty-points';
        pointsElement.className = 'text-blue-500 ml-2';
        totalAmountElement.appendChild(pointsElement);
    }
    pointsElement.textContent = `(포인트: ${bonusPoints})`;
}

function updateStockStatus() {
    let stockMessage = '';
    productList.forEach(function (item) {
        if (item.q < 5) {
            stockMessage += `${item.name}: ${item.q > 0 ? `재고 부족 (${item.q}개 남음)` : '품절'}\n`;
        }
    });
    stockStatusElement.textContent = stockMessage;
}

function handleAddToCart() {
    const selectedProductId = productSelectElement.value;
    const productToAdd = productList.find(function (p) {
        return p.id === selectedProductId;
    });
    if (productToAdd && productToAdd.q > 0) {
        const existingCartItem = document.getElementById(productToAdd.id);
        if (existingCartItem) {
            const newQuantity = parseInt(existingCartItem.querySelector('span').textContent.split('x ')[1]) + 1;
            if (newQuantity <= productToAdd.q) {
                existingCartItem.querySelector('span').textContent =
                    productToAdd.name + ' - ' + productToAdd.val + '원 x ' + newQuantity;
                productToAdd.q--;
            } else {
                alert('재고가 부족합니다.');
            }
        } else {
            const newItemElement = document.createElement('div');
            newItemElement.id = productToAdd.id;
            newItemElement.className = 'flex justify-between items-center mb-2';
            newItemElement.innerHTML =
                '<span>' +
                productToAdd.name +
                ' - ' +
                productToAdd.val +
                '원 x 1</span><div>' +
                '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
                productToAdd.id +
                '" data-change="-1">-</button>' +
                '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
                productToAdd.id +
                '" data-change="1">+</button>' +
                '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
                productToAdd.id +
                '">삭제</button></div>';
            cartItemsContainer.appendChild(newItemElement);
            productToAdd.q--;
        }
        calculateCart();
        lastSelectedProductId = selectedProductId;
    }
}

function handleCartItemClick(event) {
    const targetElement = event.target;
    if (targetElement.classList.contains('quantity-change') || targetElement.classList.contains('remove-item')) {
        const productId = targetElement.dataset.productId;
        const cartItemElement = document.getElementById(productId);
        const product = productList.find(function (p) {
            return p.id === productId;
        });
        if (targetElement.classList.contains('quantity-change')) {
            const quantityChange = parseInt(targetElement.dataset.change);
            const newQuantity =
                parseInt(cartItemElement.querySelector('span').textContent.split('x ')[1]) + quantityChange;
            if (
                newQuantity > 0 &&
                newQuantity <= product.q + parseInt(cartItemElement.querySelector('span').textContent.split('x ')[1])
            ) {
                cartItemElement.querySelector('span').textContent =
                    cartItemElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
                product.q -= quantityChange;
            } else if (newQuantity <= 0) {
                cartItemElement.remove();
                product.q -= quantityChange;
            } else {
                alert('재고가 부족합니다.');
            }
        } else if (targetElement.classList.contains('remove-item')) {
            const removeQuantity = parseInt(cartItemElement.querySelector('span').textContent.split('x ')[1]);
            product.q += removeQuantity;
            cartItemElement.remove();
        }
        calculateCart();
    }
}

main();
