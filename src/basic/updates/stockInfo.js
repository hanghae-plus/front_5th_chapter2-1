import { prodList } from '../lib/constants';
import { getProductStockStatusString } from '../lib/utils';

// 재고 상태 업데이트 (5개 미만인 상품에 대한 경고 메시지 표시)
export function updateStockInfo() {
  const stockInfo = document.getElementById('stock-status');

  const infoMsg = prodList
    // 재고가 5개 미만인 상품만 필터링
    .filter((p) => p.quantity < 5)
    // 각 재고별 상태 문자열로 변환
    .map(getProductStockStatusString)
    // 줄바꿈 문자로 연결
    .join('\n');

  stockInfo.textContent = infoMsg;
}
