var productList,
    selectProductEl,
    addBtn,
    cartDisplayEl,
    totalAmountEl,
    productStockEl;
var lastSel, // 추후 바꿔야 될 꺼 같음
    bonusPoints = 0,
    totalAmount = 0,
    productCount = 0;
function main() {
    productList = [
        { id: "p1", name: "상품1", val: 10000, q: 50 },
        { id: "p2", name: "상품2", val: 20000, q: 30 },
        { id: "p3", name: "상품3", val: 30000, q: 20 },
        { id: "p4", name: "상품4", val: 15000, q: 0 },
        { id: "p5", name: "상품5", val: 25000, q: 10 },
    ];
    var rootEl = document.getElementById("app");
    let containerEl = document.createElement("div");
    var wrapperEl = document.createElement("div");
    let titleEl = document.createElement("h1");
    cartDisplayEl = document.createElement("div"); // 상품들은 담는 div
    totalAmountEl = document.createElement("div");
    selectProductEl = document.createElement("select");
    addBtn = document.createElement("button");
    productStockEl = document.createElement("div");
    cartDisplayEl.id = "cart-items";
    totalAmountEl.id = "cart-total";
    selectProductEl.id = "product-select";
    addBtn.id = "add-to-cart";
    productStockEl.id = "stock-status";
    containerEl.className = "bg-gray-100 p-8";
    wrapperEl.className =
        "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    titleEl.className = "text-2xl font-bold mb-4";
    totalAmountEl.className = "text-xl font-bold my-4";
    selectProductEl.className = "border rounded p-2 mr-2";
    addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
    productStockEl.className = "text-sm text-gray-500 mt-2";
    titleEl.textContent = "장바구니";
    addBtn.textContent = "추가";
    updateSelectOptions();
    wrapperEl.appendChild(titleEl);
    wrapperEl.appendChild(cartDisplayEl);
    wrapperEl.appendChild(totalAmountEl);
    wrapperEl.appendChild(selectProductEl);
    wrapperEl.appendChild(addBtn);
    wrapperEl.appendChild(productStockEl);
    containerEl.appendChild(wrapperEl);
    rootEl.appendChild(containerEl);
    calcCart();
    setTimeout(function () {
        setInterval(function () {
            var flashSaleProduct =
                productList[Math.floor(Math.random() * productList.length)];
            console.log("flashSaleProduct: ", flashSaleProduct);
            if (Math.random() < 0.3 && flashSaleProduct.q > 0) {
                flashSaleProduct.val = Math.round(flashSaleProduct.val * 0.8);
                alert(
                    "번개세일! " +
                        flashSaleProduct.name +
                        "이(가) 20% 할인 중입니다!"
                );
                updateSelectOptions();
            }
        }, 30000);
    }, Math.random() * 10000);
    setTimeout(function () {
        setInterval(function () {
            console.log("lastSel: ", lastSel);

            if (lastSel) {
                var suggest = productList.find(function (item) {
                    return item.id !== lastSel && item.q > 0;
                });
                if (suggest) {
                    alert(
                        suggest.name +
                            "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
                    );
                    suggest.val = Math.round(suggest.val * 0.95);
                    updateSelectOptions();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
}
function updateSelectOptions() {
    selectProductEl.innerHTML = "";
    productList.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name + " - " + item.val + "원";
        if (item.q === 0) option.disabled = true;
        selectProductEl.appendChild(option);
    });
}
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
            var currentCartItem;
            for (var j = 0; j < productList.length; j++) {
                if (productList[j].id === cartItems[i].id) {
                    currentCartItem = productList[j];
                    break;
                }
            }
            console.log("currentCartItemL: ", currentCartItem);
            console.log("cartItem.span: ", cartItems[i].querySelector("span"));

            // q는 주문수량
            var orderCount = parseInt(
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
        var bulkDisc = totalAmount * 0.25;
        var itemDisc = subTotalBeforeDiscount - totalAmount;
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
        var discountRateSpan = document.createElement("span");
        discountRateSpan.className = "text-green-500 ml-2";
        discountRateSpan.textContent =
            "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
        totalAmountEl.appendChild(discountRateSpan);
    }
    updateStockInfo();
    renderBonusPoints();
}

// ptsd 올꺼 같네..
// 포인트 관련해서 렌더하는 함수인거 같음.
const renderBonusPoints = () => {
    bonusPoints = Math.floor(totalAmount / 1000);
    console.log("bonusPoints: ", bonusPoints);

    var pointsSpan = document.getElementById("loyalty-points");
    console.log("pointsSpan: ", pointsSpan);

    if (!pointsSpan) {
        console.log("들어오니2?");

        pointsSpan = document.createElement("span");
        pointsSpan.id = "loyalty-points";
        pointsSpan.className = "text-blue-500 ml-2";
        totalAmountEl.appendChild(pointsSpan);
    }
    pointsSpan.textContent = "(포인트: " + bonusPoints + ")";
};
// 먼가.. 업데이트를 하는데.. 재고품 정보 ?
// ex) 상품4: 품절
function updateStockInfo() {
    var stockMessage = "";
    productList.forEach(function (item) {
        if (item.q < 5) {
            stockMessage +=
                item.name +
                ": " +
                (item.q > 0 ? "재고 부족 (" + item.q + "개 남음)" : "품절") +
                "\n";
        }
    });
    productStockEl.textContent = stockMessage;
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
