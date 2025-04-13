var prodList, sel, addBtn, cartDisp, sum, stockInfo;
var lastSel,
    bonusPts = 0,
    totalAmt = 0,
    itemCnt = 0;
function main() {
    prodList = [
        { id: "p1", name: "상품1", val: 10000, q: 50 },
        { id: "p2", name: "상품2", val: 20000, q: 30 },
        { id: "p3", name: "상품3", val: 30000, q: 20 },
        { id: "p4", name: "상품4", val: 15000, q: 0 },
        { id: "p5", name: "상품5", val: 25000, q: 10 },
    ];
    var root = document.getElementById("app");
    let cont = document.createElement("div");
    var wrap = document.createElement("div");
    let hTxt = document.createElement("h1");
    cartDisp = document.createElement("div"); // 상품들은 담는 div
    sum = document.createElement("div");
    sel = document.createElement("select");
    addBtn = document.createElement("button");
    stockInfo = document.createElement("div");
    cartDisp.id = "cart-items";
    sum.id = "cart-total";
    sel.id = "product-select";
    addBtn.id = "add-to-cart";
    stockInfo.id = "stock-status";
    cont.className = "bg-gray-100 p-8";
    wrap.className =
        "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    hTxt.className = "text-2xl font-bold mb-4";
    sum.className = "text-xl font-bold my-4";
    sel.className = "border rounded p-2 mr-2";
    addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
    stockInfo.className = "text-sm text-gray-500 mt-2";
    hTxt.textContent = "장바구니";
    addBtn.textContent = "추가";
    updateSelOpts();
    wrap.appendChild(hTxt);
    wrap.appendChild(cartDisp);
    wrap.appendChild(sum);
    wrap.appendChild(sel);
    wrap.appendChild(addBtn);
    wrap.appendChild(stockInfo);
    cont.appendChild(wrap);
    root.appendChild(cont);
    calcCart();
    setTimeout(function () {
        setInterval(function () {
            var luckyItem =
                prodList[Math.floor(Math.random() * prodList.length)];
            if (Math.random() < 0.3 && luckyItem.q > 0) {
                luckyItem.val = Math.round(luckyItem.val * 0.8);
                alert(
                    "번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!"
                );
                updateSelOpts();
            }
        }, 300000);
    }, Math.random() * 10000);
    setTimeout(function () {
        setInterval(function () {
            if (lastSel) {
                var suggest = prodList.find(function (item) {
                    return item.id !== lastSel && item.q > 0;
                });
                if (suggest) {
                    alert(
                        suggest.name +
                            "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
                    );
                    suggest.val = Math.round(suggest.val * 0.95);
                    updateSelOpts();
                }
            }
        }, 600000);
    }, Math.random() * 20000);
}
function updateSelOpts() {
    sel.innerHTML = "";
    prodList.forEach(function (item) {
        var opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name + " - " + item.val + "원";
        if (item.q === 0) opt.disabled = true;
        sel.appendChild(opt);
    });
}
function calcCart() {
    console.log("calcCart()");

    totalAmt = 0;
    itemCnt = 0;
    console.log(cartDisp);
    console.log(cartDisp.children);

    var cartItems = cartDisp.children;
    var subTot = 0;
    for (var i = 0; i < cartItems.length; i++) {
        (function () {
            var curItem;
            for (var j = 0; j < prodList.length; j++) {
                if (prodList[j].id === cartItems[i].id) {
                    curItem = prodList[j];
                    break;
                }
            }
            console.log("curItemL: ", curItem);
            console.log("cartItem.span: ", cartItems[i].querySelector("span"));

            // q는 주문수량
            var q = parseInt(
                cartItems[i].querySelector("span").textContent.split("x ")[1]
            );
            var itemTot = curItem.val * q; // 상품가격 * 개수
            var disc = 0; // 할인율 ?
            itemCnt += q; // 총 상품 갯수
            subTot += itemTot; // 할인 전 전체 금액

            // 상품 갯수가 10개 이상이면 할인 적용
            if (q >= 10) {
                if (curItem.id === "p1") disc = 0.1;
                else if (curItem.id === "p2") disc = 0.15;
                else if (curItem.id === "p3") disc = 0.2;
                else if (curItem.id === "p4") disc = 0.05;
                else if (curItem.id === "p5") disc = 0.25;
            }
            totalAmt += itemTot * (1 - disc); // 할인 적용 된 후의 전체 금액
            console.log("q(현재 선택한 주문수량): ", q);
            console.log("itemTot(상품가격 * 개수): ", itemTot);
            console.log("itemCnt(총 상품 갯수): ", itemCnt);
            console.log("subTot(총 상품 가격): ", subTot);
            console.log("totalAmt(총 상품 가격): ", totalAmt);
        })();
    }
    let discRate = 0;

    // 대량 구매 시 할인이 가능한 조건
    if (itemCnt >= 30) {
        var bulkDisc = totalAmt * 0.25;
        var itemDisc = subTot - totalAmt;
        // 대량할인이 개별할인보다 큰 경우 25할인으로 갈아끼움
        if (bulkDisc > itemDisc) {
            totalAmt = subTot * (1 - 0.25);
            discRate = 0.25;
        } else {
            discRate = (subTot - totalAmt) / subTot;
        }
        // 30개 미만이면 그냥 개발 할인만 적용
    } else {
        console.log("여기오니 >?");
        discRate = (subTot - totalAmt) / subTot;
    }

    // 0: 일요일, 1: 월요일, 2: 화요일 ... 6:토요일..
    // 화요일이면 할인 적용
    if (new Date().getDay() === 2) {
        totalAmt *= 1 - 0.1; // 10% 추가 할인 적용
        // 기존에 15% 할인 중 → 그대로 15%
        // 기존에 5% 할인만 있었음 → 화요일이라 10%로 업그레이드
        discRate = Math.max(discRate, 0.1); // 할인 중 큰 값을 유지
    }
    sum.textContent = "총액: " + Math.round(totalAmt) + "원";
    console.log("discRate(할인율): ", discRate);

    if (discRate > 0) {
        var span = document.createElement("span");
        span.className = "text-green-500 ml-2";
        span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
        sum.appendChild(span);
    }
    updateStockInfo();
    renderBonusPts();
}

// ptsd 올꺼 같네..
// 포인트 관련해서 렌더하는 함수인거 같음.
const renderBonusPts = () => {
    bonusPts = Math.floor(totalAmt / 1000);
    console.log("bonusPts: ", bonusPts);

    var ptsTag = document.getElementById("loyalty-points");
    console.log("ptsTag: ", ptsTag);

    if (!ptsTag) {
        console.log("들어오니2?");

        ptsTag = document.createElement("span");
        ptsTag.id = "loyalty-points";
        ptsTag.className = "text-blue-500 ml-2";
        sum.appendChild(ptsTag);
    }
    ptsTag.textContent = "(포인트: " + bonusPts + ")";
};
// 먼가.. 업데이트를 하는데.. 재고품 정보 ?
// ex) 상품4: 품절
function updateStockInfo() {
    var infoMsg = "";
    prodList.forEach(function (item) {
        if (item.q < 5) {
            infoMsg +=
                item.name +
                ": " +
                (item.q > 0 ? "재고 부족 (" + item.q + "개 남음)" : "품절") +
                "\n";
        }
    });
    stockInfo.textContent = infoMsg;
}
main();
// 추가 버튼 클릭
addBtn.addEventListener("click", function () {
    console.log("추가 버튼 클릭");

    // 상품 선택하는 드롭다운
    var selItem = sel.value;
    console.log("selItem: ", selItem);

    var itemToAdd = prodList.find(function (p) {
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
            cartDisp.appendChild(newItem);
            itemToAdd.q--;
        }
        calcCart();
        lastSel = selItem;
    }
});
cartDisp.addEventListener("click", function (event) {
    console.log("cartDisp");

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
        var prod = prodList.find(function (p) {
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
