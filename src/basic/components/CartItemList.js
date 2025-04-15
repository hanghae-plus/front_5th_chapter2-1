// 장바구니 아이템 리스트 및 렌더링
export const CartItemList = (cartItemListElement, productList, calculationCart) => {
    cartItemListElement.addEventListener('click', function (event) {
        var tgt = event.target;
        if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
            var prodId = tgt.dataset.productId;
            var itemElem = document.getElementById(prodId);
            var prod = productList.find(function (p) { return p.id === prodId; });
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
            calculationCart();
        }
    });
}
