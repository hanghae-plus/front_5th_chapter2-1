import { products } from '../const';
import { calculateCart } from './calculateCart';

/**
 * 장바구니 아이템 클릭 이벤트 처리
 */
export const handleCartItemClick = (event) => {
    let target = event.target;
    // 수량 변경 또는 삭제 버튼 클릭 시
    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
        // 상품 아이템 id 설정
        let productId = target.dataset.productId;
        // 상품 아이템 찾기
        let itemElement = document.getElementById(productId);
        // 상품 아이템 찾기
        let targetProduct = products.find((item) => item.id === productId);
        // 수량 변경 버튼 클릭 시
        if (target.classList.contains('quantity-change')) {
            // 수량 변경 값 설정
            let changedQuantity = parseInt(target.dataset.change);
            // 새로운 수량 계산
            let newQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]) + changedQuantity;
            // 새로운 수량 있을 시
            if (
                newQuantity > 0 &&
                newQuantity <=
                    targetProduct.quantity + parseInt(itemElement.querySelector('span').textContent.split('x ')[1])
            ) {
                // 상품 아이템 텍스트 업데이트
                itemElement.querySelector('span').textContent =
                    itemElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
                // 상품 아이템 재고 감소
                targetProduct.quantity -= changedQuantity;
            }
            // 수량 0 이하 시
            else if (newQuantity <= 0) {
                // 상품 아이템 삭제
                itemElement.remove();
                // 상품 아이템 재고 감소
                targetProduct.quantity -= changedQuantity;
            }
            // 재고 부족 시 알림
            else {
                alert('재고가 부족합니다.');
            }
        }
        // 삭제 버튼 클릭 시
        else if (target.classList.contains('remove-item')) {
            // 상품 아이템 수량 설정
            let removedQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);
            // 상품 아이템 재고 증가
            targetProduct.quantity += removedQuantity;
            // 상품 아이템 삭제
            itemElement.remove();
        }
        // 카트 렌더링
        calculateCart(products);
    }
};
