import { productList } from "./data/productData.js";
import {
    createContainer,
    createWrapper,
    createCartTitle,
    createCartDisplay,
    createTotalAmount,
    createSelectProduct,
    createAddBtn,
    createProductStock,
} from "./utils/createElement.js";
import {
    renderBonusPoints,
    updateStockInfo,
    updateSelectOptions,
} from "./components";

import {
    startFlashSaleTimer,
    startProductSuggestionTimer,
} from "./service/promotion.js";

import {
    setupAddButtonHandler,
    setupCartItemEvents,
} from "./events/cartEvent.js";

import { calculateCart } from "./service/cartService.js";

import {
    buildLayout,
    selectLayout,
    // updateSelectOptions,
    cartDisplayLayout,
} from "./layout/layoutManager.js";

const cartDisplayEl = createCartDisplay();

const totalAmountEl = createTotalAmount();
const selectProductEl = createSelectProduct();
const addBtn = createAddBtn();
const productStockEl = createProductStock();

let lastSel; // 추후 바꿔야 될 꺼 같음

function main() {
    const app = document.getElementById("app");

    const containerEl = createContainer();
    const wrapperEl = createWrapper();
    const cartTitleEl = createCartTitle();

    updateSelectOptions(productList, selectProductEl);

    wrapperEl.append(
        cartTitleEl,
        cartDisplayEl,
        totalAmountEl,
        selectProductEl,
        addBtn,
        productStockEl
    );
    containerEl.appendChild(wrapperEl);
    app.appendChild(containerEl);

    calcCart();

    startFlashSaleTimer(productList, () =>
        updateSelectOptions(productList, selectProductEl)
    );
    startProductSuggestionTimer(productList, lastSel, () =>
        updateSelectOptions(productList, selectProductEl)
    );

    // 추가 버튼 이벤트 핸들러 설정
    setupAddButtonHandler(
        addBtn,
        cartDisplayEl,
        selectProductEl,
        productList,
        calcCart,
        (value) => {
            lastSel = value;
        }
    );
    // 장바구니 Item 클릭 리스너
    setupCartItemEvents(cartDisplayEl, productList, calcCart);
}

function calcCart() {
    let cartItems = cartDisplayEl.children;
    // let subTotalBeforeDiscount = 0;

    const { totalAmount, discountRate } = calculateCart(cartItems, productList);

    totalAmountEl.textContent = "총액: " + Math.round(totalAmount) + "원";

    // 얘는 일단 놔둬놓고..
    if (discountRate > 0) {
        const discountRateSpan = document.createElement("span");
        discountRateSpan.className = "text-green-500 ml-2";
        discountRateSpan.textContent =
            "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
        totalAmountEl.appendChild(discountRateSpan);
    }
    updateStockInfo(productList, productStockEl);
    renderBonusPoints(totalAmount, totalAmountEl);
}

main();
