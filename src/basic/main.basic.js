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
    buildLayout,
    selectLayout,
    // updateSelectOptions,
    cartDisplayLayout,
} from "./layout/layoutManager.js";

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
function calcCart() {
    console.log("calcCart()");

    totalAmount = 0;
    productCount = 0;
    console.log(cartDisplayEl);
    console.log(cartDisplayEl.children);

    var cartItems = cartDisplayEl.children;
    var subTotalBeforeDiscount = 0;
    for (var i = 0; i < cartItems.length; i++) {
        (function () {
            let currentCartItem;
            for (var j = 0; j < productList.length; j++) {
                if (productList[j].id === cartItems[i].id) {
                    currentCartItem = productList[j];
                    break;
                }
            }
            console.log("currentCartItemL: ", currentCartItem);
            console.log("cartItem.span: ", cartItems[i].querySelector("span"));

            // q는 주문수량
            const orderCount = parseInt(
                cartItems[i].querySelector("span").textContent.split("x ")[1]
            );
            var itemPriceTotal = currentCartItem.val * orderCount; // 상품가격 * 개수
            var discount = 0; // 할인율 ?
            productCount += orderCount; // 총 상품 갯수
            subTotalBeforeDiscount += itemPriceTotal; // 할인 전 전체 금액

            // 상품 갯수가 10개 이상이면 할인 적용
            if (orderCount >= 10) {
                if (currentCartItem.id === "p1") discount = 0.1;
                else if (currentCartItem.id === "p2") discount = 0.15;
                else if (currentCartItem.id === "p3") discount = 0.2;
                else if (currentCartItem.id === "p4") discount = 0.05;
                else if (currentCartItem.id === "p5") discount = 0.25;
            }
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
    let discountRate = 0;

    // 대량 구매 시 할인이 가능한 조건
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

    // 0: 일요일, 1: 월요일, 2: 화요일 ... 6:토요일..
    // 화요일이면 할인 적용
    if (new Date().getDay() === 2) {
        totalAmount *= 1 - 0.1; // 10% 추가 할인 적용
        // 기존에 15% 할인 중 → 그대로 15%
        // 기존에 5% 할인만 있었음 → 화요일이라 10%로 업그레이드
        discountRate = Math.max(discountRate, 0.1); // 할인 중 큰 값을 유지
    }

    totalAmountEl.textContent = "총액: " + Math.round(totalAmount) + "원";
    console.log("discountRate(할인율): ", discountRate);

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
// 추가 버튼 클릭
addBtn.addEventListener("click", function () {
    console.log("추가 버튼 클릭");

    // 상품 선택하는 드롭다운
    var selItem = selectProductEl.value;
    console.log("selItem: ", selItem);

    var itemToAdd = productList.find(function (p) {
        return p.id === selItem;
    });
    console.log("itemToAdd: ", itemToAdd);

    if (itemToAdd && itemToAdd.q > 0) {
        var item = document.getElementById(itemToAdd.id);
        console.log("item: ", item);

        if (item) {
            console.log("들어오니3?");

            var newQty =
                parseInt(
                    item.querySelector("span").textContent.split("x ")[1]
                ) + 1;
            if (newQty <= itemToAdd.q) {
                item.querySelector("span").textContent =
                    itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQty;
                itemToAdd.q--;
            } else {
                alert("재고가 부족합니다.");
            }
        } else {
            console.log("들어오니4?");

            var newItem = document.createElement("div");
            newItem.id = itemToAdd.id;
            newItem.className = "flex justify-between items-center mb-2";
            newItem.innerHTML =
                "<span>" +
                itemToAdd.name +
                " - " +
                itemToAdd.val +
                "원 x 1</span><div>" +
                '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
                itemToAdd.id +
                '" data-change="-1">-</button>' +
                '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
                itemToAdd.id +
                '" data-change="1">+</button>' +
                '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
                itemToAdd.id +
                '">삭제</button></div>';
            cartDisplayEl.appendChild(newItem);
            itemToAdd.q--;
        }
        calcCart();
        lastSel = selItem;
    }
});
cartDisplayEl.addEventListener("click", function (event) {
    console.log("cartDisplayEl");

    var tgt = event.target;
    console.log("tgt: ", tgt);

    // quantity-change: - + class
    // remove-item: 삭제 class
    if (
        tgt.classList.contains("quantity-change") ||
        tgt.classList.contains("remove-item")
    ) {
        var prodId = tgt.dataset.productId;
        var itemElem = document.getElementById(prodId);
        var prod = productList.find(function (p) {
            return p.id === prodId;
        });
        if (tgt.classList.contains("quantity-change")) {
            var qtyChange = parseInt(tgt.dataset.change);
            var newQty =
                parseInt(
                    itemElem.querySelector("span").textContent.split("x ")[1]
                ) + qtyChange;
            if (
                newQty > 0 &&
                newQty <=
                    prod.q +
                        parseInt(
                            itemElem
                                .querySelector("span")
                                .textContent.split("x ")[1]
                        )
            ) {
                itemElem.querySelector("span").textContent =
                    itemElem.querySelector("span").textContent.split("x ")[0] +
                    "x " +
                    newQty;
                prod.q -= qtyChange;
            } else if (newQty <= 0) {
                itemElem.remove();
                prod.q -= qtyChange;
            } else {
                alert("재고가 부족합니다.");
            }
        } else if (tgt.classList.contains("remove-item")) {
            var remQty = parseInt(
                itemElem.querySelector("span").textContent.split("x ")[1]
            );
            prod.q += remQty;
            itemElem.remove();
        }
        calcCart();
    }
});
