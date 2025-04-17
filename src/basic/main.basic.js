import {state} from "./store/state.js";
import {initCartDisplayEvents} from "./components/cartDisplay.js";


function main() {
    initCartDisplayEvents();
    state.products = [
        {id: 'p1', name: '상품1', val: 10000, q: 50},
        {id: 'p2', name: '상품2', val: 20000, q: 30},
        {id: 'p3', name: '상품3', val: 30000, q: 20},
        {id: 'p4', name: '상품4', val: 15000, q: 0},
        {id: 'p5', name: '상품5', val: 25000, q: 10}
    ];
    var root = document.getElementById('app');
    let cont = document.createElement('div');
    var wrap = document.createElement('div');


    const addBtn = createElement('button',{
        className: 'bg-blue-500 text-white px-4 py-2 rounded',
        text: '추가',
        id: 'add-to-cart',
    })



    state.elements.cartDisplay = document.createElement('div');
    state.elements.totalDisplay = document.createElement('div');
    state.elements.select = document.createElement('select');
    state.elements.stockInfo = document.createElement('div');
    state.elements.cartDisplay.id = 'cart-items';
    state.elements.totalDisplay.id = 'cart-total';
    state.elements.select.id = 'product-select';
    state.elements.stockInfo.id = 'stock-status';
    cont.className = 'bg-gray-100 p-8';
    wrap.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

    state.elements.totalDisplay.className = 'text-xl font-bold my-4';
    state.elements.select.className = 'border rounded p-2 mr-2';
    state.elements.stockInfo.className = 'text-sm text-gray-500 mt-2';

    updateSelOpts();
    wrap.appendChild(hTxt);
    wrap.appendChild(state.elements.cartDisplay);
    wrap.appendChild(state.elements.totalDisplay);
    wrap.appendChild(state.elements.select);
    wrap.appendChild(state.elements.addBtn);
    wrap.appendChild(state.elements.stockInfo);
    cont.appendChild(wrap);
    root.appendChild(cont);
    calcCart();

    setTimeout(function () {
        setInterval(function () {
            var luckyItem = state.products[Math.floor(Math.random() * state.products.length)];
            if (Math.random() < 0.3 && luckyItem.q > 0) {
                luckyItem.val = Math.round(luckyItem.val * 0.8);
                alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
                updateSelOpts();
            }
        }, 30000);
    }, Math.random() * 10000);
    setTimeout(function () {
        setInterval(function () {
            if (state.lastSelected) {
                var suggest = state.products.find(function (item) {
                    return item.id !== state.lastSelected && item.q > 0;
                });
                if (suggest) {
                    alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                    suggest.val = Math.round(suggest.val * 0.95);
                    updateSelOpts();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
};

function updateSelOpts() {
    state.elements.select.innerHTML = '';
    state.products.forEach(function (item) {
        var opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.name + ' - ' + item.val + '원';
        if (item.q === 0) opt.disabled = true;
        state.elements.select.appendChild(opt);
    });
}

function calcCart() {
    state.totalAmount = 0;
    state.itemCount = 0;
    var cartItems = state.elements.cartDisplay.children;
    var subTot = 0;
    for (var i = 0; i < cartItems.length; i++) {
        (function () {
            var curItem;
            for (var j = 0; j < state.products.length; j++) {
                if (state.products[j].id === cartItems[i].id) {
                    curItem = state.products[j];
                    break;
                }
            }
            var q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
            var itemTot = curItem.val * q;
            var disc = 0;
            state.itemCount += q;
            subTot += itemTot;
            if (q >= 10) {
                if (curItem.id === 'p1') disc = 0.1;
                else if (curItem.id === 'p2') disc = 0.15;
                else if (curItem.id === 'p3') disc = 0.2;
                else if (curItem.id === 'p4') disc = 0.05;
                else if (curItem.id === 'p5') disc = 0.25;
            }
            state.totalAmount += itemTot * (1 - disc);
        })();
    }

    let discRate = 0;

    if (itemCount >= 30) {
        var bulkDisc = state.totalAmount * 0.25;
        var itemDisc = subTot - state.totalAmount;
        if (bulkDisc > itemDisc) {
            state.totalAmount = subTot * (1 - 0.25);
            discRate = 0.25;
        } else {
            discRate = (subTot - state.totalAmount) / subTot;
        }
    } else {
        discRate = (subTot - state.totalAmount) / subTot;
    }
    if (new Date().getDay() === 2) {
        state.totalAmount *= (1 - 0.1);
        discRate = Math.max(discRate, 0.1);
    }
    state.elements.totalDisplay.textContent = '총액: ' + Math.round(state.totalAmount) + '원';
    if (discRate > 0) {
        var span = document.createElement('span');
        span.className = 'text-green-500 ml-2';
        span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
        state.elements.totalDisplay.appendChild(span);
    }
    updateStockInfo();
    renderBonusPts();
}

const renderBonusPts = () => {
    state.bonusPoints = Math.floor(state.totalAmount / 1000);
    var ptsTag = document.getElementById('loyalty-points');
    if (!ptsTag) {
        ptsTag = document.createElement('span');
        ptsTag.id = 'loyalty-points';
        ptsTag.className = 'text-blue-500 ml-2';
        state.elements.totalDisplay.appendChild(ptsTag);
    }
    ptsTag.textContent = '(포인트: ' + state.bonusPoints + ')';
};

function updateStockInfo() {
    var infoMsg = '';
    state.products.forEach(function (item) {
        if (item.q < 5) {
            infoMsg += item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
        }
    });
    state.elements.stockInfo.textContent = infoMsg;
}

main();

state.elements.addBtn.addEventListener('click', function () {
    var selItem = select.value;
    var itemToAdd = state.products.find(function (p) {
        return p.id === selItem;
    });
    if (itemToAdd && itemToAdd.q > 0) {
        var item = document.getElementById(itemToAdd.id);
        if (item) {
            var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
            if (newQty <= itemToAdd.q) {
                item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
                itemToAdd.q--;
            } else {
                alert('재고가 부족합니다.');
            }
        } else {
            var newItem = document.createElement('div');
            newItem.id = itemToAdd.id;
            newItem.className = 'flex justify-between items-center mb-2';
            newItem.innerHTML = '<span>' + itemToAdd.name + ' - ' + itemToAdd.val + '원 x 1</span><div>' +
                '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
                '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
                '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
            state.elements.cartDisplay.appendChild(newItem);
            itemToAdd.q--;
        }
        calcCart();
        state.lastSelected = selItem;
    }
});