import {state} from './store/state.js';
import {calcCart} from './components/totalDisplay.js';
import {initCartDisplayEvents} from './components/cartDisplay.js';
import {initAddToCartHandler} from './events/addToCartHandler.js';
import {createElement} from "./utils/createElement.js";
import {updateSelectedOptions} from "./components/productSelect.js";

function main() {
    // 1. 제품 초기화
    state.products = [
        {id: 'p1', name: '상품1', val: 10_000, q: 50},
        {id: 'p2', name: '상품2', val: 20_000, q: 30},
        {id: 'p3', name: '상품3', val: 30_000, q: 20},
        {id: 'p4', name: '상품4', val: 15_000, q: 0},
        {id: 'p5', name: '상품5', val: 25_000, q: 10},
    ];

    // 2. 기본 UI 요소 생성
    const root = document.getElementById('app');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const title = createElement('h1', {
        className: 'text-2xl font-bold mb-4',
        text: '장바구니',
    });

    state.elements.addBtn = createElement('button', {
        className: 'bg-blue-500 text-white px-4 py-2 rounded',
        text: '추가',
        id: 'add-to-cart',
    });
    state.elements.select = document.createElement('select');
    state.elements.cartDisplay = document.createElement('div');
    state.elements.totalDisplay = document.createElement('div');
    state.elements.stockInfo = document.createElement('div');

    state.elements.select.id = 'product-select';
    state.elements.cartDisplay.id = 'cart-items';
    state.elements.totalDisplay.id = 'cart-total';
    state.elements.stockInfo.id = 'stock-status';

    state.elements.select.className = 'border rounded p-2 mr-2';
    state.elements.totalDisplay.className = 'text-xl font-bold my-4';
    state.elements.stockInfo.className = 'text-sm text-gray-500 mt-2';
    wrapper.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
    container.className = 'bg-gray-100 p-8';

    // 3. UI 요소 조립
    wrapper.appendChild(title);
    wrapper.appendChild(state.elements.cartDisplay);
    wrapper.appendChild(state.elements.totalDisplay);
    wrapper.appendChild(state.elements.select);
    wrapper.appendChild(state.elements.addBtn);
    wrapper.appendChild(state.elements.stockInfo);
    container.appendChild(wrapper);
    root.appendChild(container);

    // 4. 초기 렌더링 및 이벤트 바인딩
    updateSelectedOptions();
    calcCart();
    initAddToCartHandler();
    initCartDisplayEvents();

    // 5. 동적 프로모션 타이머
    startLightningSale();
    startSuggestiveDiscount();
}

// 30초마다 번개 세일
function startLightningSale() {
    setTimeout(() => {
        setInterval(() => {
            const luckyItem = state.products[Math.floor(Math.random() * state.products.length)];
            if (Math.random() < 0.3 && luckyItem.q > 0) {
                luckyItem.val = Math.round(luckyItem.val * 0.8);
                alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
                updateSelectedOptions();
            }
        }, 30_000);
    }, Math.random() * 10_000);
}

// 60초마다 제안 메시지
function startSuggestiveDiscount() {
    setTimeout(() => {
        setInterval(() => {
            if (!state.lastSelected) return;
            const suggestion = state.products.find(p => p.id !== state.lastSelected && p.q > 0);
            if (suggestion) {
                alert(`${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
                suggestion.val = Math.round(suggestion.val * 0.95);
                updateSelectedOptions();
            }
        }, 60_000);
    }, Math.random() * 20_000);
}

main();
