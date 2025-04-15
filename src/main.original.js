// 컴포넌트 임포트
import { container } from "./ui/Container"
import { cartItem } from "./ui/CartItem"
import { cartResult } from "./ui/CartTotal"
import { selectBox } from "./ui/selectBox"
import { cartAddBtn } from "./ui/cartAddBtn"
import { stockInfo } from "./ui/StockInfo"

import { PRODUCT_LIST } from "./store/PRODUCT"
import { useCart } from "./module/useCart"

// TODO: 전역 변수 지우기..
var $cartItem, $cartResult, $selectBox, $cartAddBtn, $stockInfo
var lastSel,
    bonusPts = 0,
    totalAmt = 0,
    itemCnt = 0

function main() {
    // 루트 요소
    const root = document.getElementById("app")

    // 훅 초기화
    const cart = useCart()

    // 컨테이너 생성 - 완료
    const containerC = container()
    containerC.render(root)

    // 장바구니 컴포넌트 생성- 완료
    // TODO: 전역변수 처리 필요
    const cartItemC = cartItem()
    cartItemC.render(containerC.wrapperEl)
    $cartItem = cartItemC.element
    $cartItem.addEventListener("click", handleCartClick)

    // 장바구니 금액 합계 컴포넌트 생성
    // TODO: 전역변수 처리 필요
    // TODO: updateTotal, updateBonusPoints 처리 방향 고민
    const cartResultC = cartResult()
    cartResultC.render(containerC.wrapperEl)
    $cartResult = cartResultC.element
    window.cartResultC = cartResultC

    // 상품 선택 컴포넌트 생성
    // TODO: 전역변수 처리 필요
    // TODO: updateOptions 처리 방향 고민
    const selectBoxC = selectBox()
    selectBoxC.render(containerC.wrapperEl)
    $selectBox = selectBoxC.element

    // 장바구니 추가 버튼 컴포넌트 생성
    // TODO: 전역변수 처리 필요
    // TODO: setupEventHandler 처리 방향 고민
    const cartAddBtnC = cartAddBtn()
    cartAddBtnC.render(containerC.wrapperEl)
    $cartAddBtn = cartAddBtnC.element // 수정된 부분

    // 장바구니 추가 버튼 클릭 이벤트 핸들러 등록
    cartAddBtnC.setupEventHandler(() => {
        cart.addToCart($selectBox, $cartItem)
        calcCart()
        lastSel = $selectBox.value
    })

    // 재고 정보 컴포넌트 생성
    const stockInfoC = stockInfo()
    stockInfoC.render(containerC.wrapperEl)
    $stockInfo = stockInfoC.element
    window.stockInfoC = stockInfoC

    // 초기 계산
    calcCart()

    // 타이머 시작
    // timeOutSale();
}

function handleCartClick(event) {
  var tgt=event.target;
  
  if(tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId=tgt.dataset.productId;
    var itemElem=document.getElementById(prodId);
    var prod=prodList.find(function (p) { return p.id === prodId; });
    if(tgt.classList.contains('quantity-change')) {
      var qtyChange=parseInt(tgt.dataset.change);
      var newQty=parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if(newQty > 0 && newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
        itemElem.querySelector('span').textContent=itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.q -= qtyChange;
      } else if(newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if(tgt.classList.contains('remove-item')) {
      var remQty=parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calcCart();
}

// 장바구니 전체 계산
function calcCart() {
    totalAmt = 0
    itemCnt = 0

    var cartItems = $cartItem.children
    var subTot = 0

    // 계산
    for (var i = 0; i < cartItems.length; i++) {
        ;(function () {
            var curItem
            for (var j = 0; j < PRODUCT_LIST.length; j++) {
                if (PRODUCT_LIST[j].id === cartItems[i].id) {
                    curItem = PRODUCT_LIST[j]
                    break
                }
            }
            var q = parseInt(
                cartItems[i].querySelector("span").textContent.split("x ")[1],
            )
            var itemTot = curItem.val * q
            var disc = 0
            itemCnt += q
            subTot += itemTot
            if (q >= 10) {
                if (curItem.id === "p1") disc = 0.1
                else if (curItem.id === "p2") disc = 0.15
                else if (curItem.id === "p3") disc = 0.2
                else if (curItem.id === "p4") disc = 0.05
                else if (curItem.id === "p5") disc = 0.25
            }
            totalAmt += itemTot * (1 - disc)
        })()
    }

    //
    let discRate = 0

    //
    if (itemCnt >= 30) {
        var bulkDisc = totalAmt * 0.25
        var itemDisc = subTot - totalAmt
        if (bulkDisc > itemDisc) {
            totalAmt = subTot * (1 - 0.25)
            discRate = 0.25
        } else {
            discRate = (subTot - totalAmt) / subTot
        }
    } else {
        discRate = (subTot - totalAmt) / subTot
    }

    //
    if (new Date().getDay() === 2) {
        totalAmt *= 1 - 0.1
        discRate = Math.max(discRate, 0.1)
    }

    // 총액 업데이트
    window.cartResultC.updateTotal(totalAmt, discRate)

    //
    window.stockInfoC.updateStockInfo()

    // 보너스
    bonusPts = Math.floor(totalAmt / 1000)
    window.cartResultC.updateBonusPoints(bonusPts)
}

// 앱 초기화
main()
