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

import {
    buildLayout,
    selectLayout,
    // updateSelectOptions,
    cartDisplayLayout,
} from "./layout/layoutManager.js";
// import { calculateTotalAmount } from "./service/cartService.js";

const cartDisplayEl = createCartDisplay();
// console.log("타입은: ", typeof cartDisplayEl);
// console.log("타입은2: ", typeof selectLayout);

const totalAmountEl = createTotalAmount();
const selectProductEl = createSelectProduct();
const addBtn = createAddBtn();
const productStockEl = createProductStock();

let lastSel, // 추후 바꿔야 될 꺼 같음
    bonusPoints = 0,
    totalAmount = 0,
    productCount = 0;

function main() {
    const app = document.getElementById("app");
    // const layout = buildLayout();
    // app.appendChild(layout);
    const containerEl = createContainer();
    const wrapperEl = createWrapper();
    const cartTitleEl = createCartTitle();
    // updateSelectOptions();
    updateSelectOptions(productList, selectProductEl);
    // 이벤트 핸들러 등에서 호출
    // refreshProductOptions();
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

// 기존 함수 제거 후 이렇게 호출
// function refreshProductOptions() {
//     updateSelectOptions(selectLayout, productList);
// }
// function updateSelectOptions() {
//     console.log("updateSelectOPtions");

//     selectProductEl.innerHTML = "";
//     productList.forEach(function (item) {
//         const option = document.createElement("option");
//         option.value = item.id;
//         option.textContent = item.name + " - " + item.val + "원";
//         if (item.q === 0) option.disabled = true;
//         selectProductEl.appendChild(option);
//     });
// }

// 개별 상품 할인
function getItemDiscount(orderCount, currentCartItem) {
    let discount = 0;
    const DISCOUNBT_RATES = {
        p1: 0.1,
        p2: 0.15,
        p3: 0.2,
        p4: 0.05,
        p5: 0.25,
    };

    if (orderCount > 10) {
        discount = DISCOUNBT_RATES[currentCartItem.id] || 0;
    }

    return discount;
}

// 대량 구매 할인
function applyBulkDiscount(productCount, subTotalBeforeDiscount, totalAmount) {
    let discountRate = 0;
    if (productCount >= 30) {
        const bulkDisc = totalAmount * 0.25;
        const itemDisc = subTotalBeforeDiscount - totalAmount;
        // 대량할인이 개별할인보다 큰 경우 25할인으로 갈아끼움
        if (bulkDisc > itemDisc) {
            totalAmount = subTotalBeforeDiscount * (1 - 0.25);
            discountRate = 0.25;
        } else {
            discountRate =
                (subTotalBeforeDiscount - totalAmount) / subTotalBeforeDiscount;
        }
        // 30개 미만이면 그냥 개발 할인만 적용
    } else {
        console.log("여기오니 >?");
        discountRate =
            (subTotalBeforeDiscount - totalAmount) / subTotalBeforeDiscount;
    }

    return {
        totalAfterBulkDiscount: totalAmount,
        bulkDIscountRate: discountRate,
    };
}
// 요일 할인
function applyWeekdayDiscount(totalAmount, discountRate) {
    let finalAmount = totalAmount;
    let finalDiscountRate = discountRate;

    const today = new Date().getDay();
    if (today === 2) {
        finalAmount = totalAmount * 0.9;
        finalDiscountRate = Math.max(discountRate, 0.1);
    }
    return {
        finalAmount,
        finalDiscountRate,
    };
}

function calculateTotalAmount(cartItems) {
    let totalAmount = 0;
    let productCount = 0;
    let subTotalBeforeDiscount = 0;

    for (var i = 0; i < cartItems.length; i++) {
        (function () {
            const currentItem = cartItems[i];
            const currentCartItem = productList.find(
                (product) => product.id === cartItems[i].id
            );

            const orderCount = parseInt(
                currentItem.querySelector("span").textContent.split("x ")[1]
            );
            const itemPriceTotal = currentCartItem.val * orderCount; // 상품가격 * 개수
            const discount = getItemDiscount(orderCount, currentCartItem);
            productCount += orderCount; // 총 상품 갯수
            subTotalBeforeDiscount += itemPriceTotal; // 할인 전 전체 금액

            totalAmount += itemPriceTotal * (1 - discount); // 할인 적용 된 후의 전체 금액

            console.log("orderCount(현재 선택한 주문수량): ", orderCount);
            console.log("itemPriceTotal(상품가격 * 개수): ", itemPriceTotal);
            console.log("productCount(총 상품 갯수): ", productCount);
            console.log(
                "subTotalBeforeDiscount(할인 전 총 상품 가격): ",
                subTotalBeforeDiscount
            );
            console.log("totalAmount(총 상품 가격): ", totalAmount);
        })();
    }

    return {
        totalAmount: totalAmount,
        productCount: productCount,
        subTotalBeforeDiscount: subTotalBeforeDiscount,
    };
}

function calcCart() {
    console.log("calcCart()");
    let cartItems = cartDisplayEl.children;
    // let subTotalBeforeDiscount = 0;

    // 개별 상품 계산
    let { totalAmount, productCount, subTotalBeforeDiscount } =
        calculateTotalAmount(cartItems);

    console.log("totalAmount: ", totalAmount);
    console.log("productCount: ", productCount);
    console.log("subTotalBeforeDiscount: ", subTotalBeforeDiscount);

    let discountRate = 0;

    // 대량 구매 시 할인이 가능한 조건
    // 대량 구매조건은 분리
    const { totalAfterBulkDiscount, bulkDIscountRate } = applyBulkDiscount(
        productCount,
        subTotalBeforeDiscount,
        totalAmount
    );

    // 0: 일요일, 1: 월요일, 2: 화요일 ... 6:토요일..
    // 화요일이면 할인 적용
    const { finalAmount, finalDiscountRate } = applyWeekdayDiscount(
        totalAfterBulkDiscount,
        bulkDIscountRate
    );
    totalAmount = finalAmount;
    discountRate = finalDiscountRate;

    totalAmountEl.textContent = "총액: " + Math.round(totalAmount) + "원";
    console.log("discountRate(할인율): ", discountRate);

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
