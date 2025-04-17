// 상품 재고 부족 알림을 업데이트하는 함수
export const updateLowStockNotice = (products, stockInfo) => {
  // filter: 재고가 5개 미만인 상품만 추출
  // map: 상품명과 재고 정보를 포함한 문자열로 변환
  const notices = products
    .filter(item => item.quantity < 5)
    .map(item => {
      const msg =
        item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절';
      return `${item.name}: ${msg}`;
    });

  stockInfo.textContent = notices.join('\n');
};
