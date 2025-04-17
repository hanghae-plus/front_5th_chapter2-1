import { createCartItem } from '../render';
import { store } from '../store/store';
import { products } from '../const';
import { calculateCart } from './calculateCart';

/**
 * 추가 버튼 클릭 이벤트 처리
 */
export const handleCartAdd = () => {
    const $select = document.getElementById('product-select');
    // 선택 아이템 찾기
    let selectedProductId = $select.value;
    let selectedProduct = products.find(function (item) {
        return item.id === selectedProductId;
    });

    // 상품 존재 및 재고 있을 시
    if (selectedProduct && selectedProduct.quantity > 0) {
        // 상품 아이템 찾기
        let $cartItem = document.getElementById(selectedProduct.id);
        // 상품 아이템 존재 시
        if ($cartItem) {
            // 상품 아이템 개수 증가
            let newQuantity = parseInt($cartItem.querySelector('span').textContent.split('x ')[1]) + 1;
            // 상품 아이템 개수 증가 시 재고 있을 시
            if (newQuantity <= selectedProduct.quantity) {
                // 상품 아이템 텍스트 업데이트
                $cartItem.querySelector('span').textContent =
                    selectedProduct.name + ' - ' + selectedProduct.price + '원 x ' + newQuantity;
                selectedProduct.quantity--;
            } else {
                // 재고 부족 시 알림
                alert('재고가 부족합니다.');
            }
        } else {
            // 장바구니 아이템 생성
            createCartItem(selectedProduct);
            // 상품 아이템 재고 감소
            selectedProduct.quantity--;
        }
        // 카드 계산
        calculateCart(products);
        // 마지막 선택 아이템 설정
        store.lastSelectedProductId = selectedProductId;
    }
};
