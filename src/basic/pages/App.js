
// var sel, addBtn, cartDisp, sum, stockInfo;
// var lastSel, bonusPts = 0, totalAmt = 0, itemCnt = 0;
import { prodList } from "../state";
import { calcCart } from "../utils/calcCart";
import store from "../state/state";

export const elementms = {
    productSelect : document.createElement('select'),
    cartItems : document.createElement('div'),
    cartTotal : document.createElement('div'),
    addToCart : document.createElement('button'),
    stockStatus : document.createElement('div'),
}

export default function App() {

    var root = document.getElementById('app');
    let cont = document.createElement('div');
    var wrap = document.createElement('div');
    let hTxt = document.createElement('h1');

    //컴포넌트 id 및 클래스네임
    elementms.cartItems.id = 'cart-items';
    elementms.cartTotal.id = 'cart-total';
    elementms.productSelect.id = 'product-select';
    elementms.addToCart.id = 'add-to-cart';
    elementms.stockStatus.id = 'stock-status';
    cont.className = 'bg-gray-100 p-8';
    wrap.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
    hTxt.className = 'text-2xl font-bold mb-4';
    elementms.cartTotal.className = 'text-xl font-bold my-4';
    elementms.productSelect.className = 'border rounded p-2 mr-2';
    elementms.addToCart.className = 'bg-blue-500 text-white px-4 py-2 rounded';
    elementms.stockStatus.className = 'text-sm text-gray-500 mt-2';

    hTxt.textContent = '장바구니';
    elementms.addToCart.textContent = '추가';

    updateSelOpts();
    wrap.appendChild(hTxt);
    wrap.appendChild(elementms.cartItems);
    wrap.appendChild(elementms.cartTotal);
    wrap.appendChild(elementms.productSelect);
    wrap.appendChild(elementms.addToCart);
    wrap.appendChild(elementms.stockStatus);
    cont.appendChild(wrap);
    root.appendChild(cont);

    calcCart();

    function notifyDiscount() {
        setTimeout(() => {
            setInterval(() => {
                const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
                if (Math.random() < 0.3 && luckyItem.quantity > 0) {
                    luckyItem.price = Math.round(luckyItem.price * 0.8);
                    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
                    updateSelOpts();
                }
            }, 30000);
        }, Math.random() * 10000);
    }

    notifyDiscount(); //함수 이름 설정

    function notifyEvent() {
        setTimeout(function () {
            setInterval(function () {
                if (store.state.lastSel) {
                    var suggest = prodList.find(function (item) { return item.id !== store.state.lastSel && item.quantity > 0; });
                    if (suggest) {
                        alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                        suggest.price = Math.round(suggest.price * 0.95);
                        updateSelOpts();
                    }
                }
            }, 60000);
        }, Math.random() * 20000);
    }

    notifyEvent();

    function updateSelOpts() {
        //useEffect안에서 쓸 함수
        elementms.productSelect.innerHTML = '';
        prodList.forEach(function (item) {
            var opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name + ' - ' + item.price + '원';
            if (item.quantity === 0) opt.disabled = true;
            elementms.productSelect.appendChild(opt);
        });
    }

    elementms.addToCart.addEventListener('click', function () {
        var selItem = elementms.productSelect.value;
        var itemToAdd = prodList.find(function (p) { return p.id === selItem; });
        if (itemToAdd && itemToAdd.quantity > 0) {
            var item = document.getElementById(itemToAdd.id);
            if (item) {
                var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
                if (newQty <= itemToAdd.quantity) {
                    item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
                    itemToAdd.quantity--;
                } else { alert('재고가 부족합니다.'); }
            } else {
                var newItem = document.createElement('div');
                newItem.id = itemToAdd.id;
                newItem.className = 'flex justify-between items-center mb-2';
                newItem.innerHTML = '<span>' + itemToAdd.name + ' - ' + itemToAdd.price + '원 x 1</span><div>' +
                    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
                    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
                    '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
                elementms.cartItems.appendChild(newItem);
                itemToAdd.quantity--;
            }
            calcCart();
            store.state.lastSel = selItem;
        }
    });

    elementms.cartItems.addEventListener('click', function (event) {
        var tgt = event.target;
        if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
            var prodId = tgt.dataset.productId;
            var itemElem = document.getElementById(prodId);
            var prod = prodList.find(function (p) { return p.id === prodId; });
            if (tgt.classList.contains('quantity-change')) {
                var qtyChange = parseInt(tgt.dataset.change);
                var newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
                if (newQty > 0 && newQty <= prod.quantity + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
                    itemElem.querySelector('span').textContent = itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
                    prod.quantity -= qtyChange;
                } else if (newQty <= 0) {
                    itemElem.remove();
                    prod.quantity -= qtyChange;
                } else {
                    alert('재고가 부족합니다.');
                }
            } else if (tgt.classList.contains('remove-item')) {
                var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
                prod.quantity += remQty;
                itemElem.remove();
            }
            calcCart();
        }
    });

};
