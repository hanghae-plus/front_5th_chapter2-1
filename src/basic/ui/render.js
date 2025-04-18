import { CONSTANTS } from '../constants/constant';
import ERROR_MESSAGES from '../constants/errorMessages';
import createEl from '../ utils/createEl';
import { state } from '../state';
import { elements } from './element';

export function updateSelOpts() {
  try {
    elements.ProductSelect.innerHTML = '';
    state.productList.forEach(function (item) {
      const opt = createEl('option', {
        value: item.id,
        text: item.name + ' - ' + item.price + '원',
      });

      if (item.count === 0) opt.disabled = true;
      elements.ProductSelect.appendChild(opt);
    });
  } catch (error) {
    console.error(ERROR_MESSAGES.SALE_SYSTEM.UPDATE_FAILED, error);
  }
}

//계산후 재고 업데이트 및 관리
export function updateStockInfo() {
  let infoMsg = '';
  state.productList.forEach((product) => {
    if (product.count < CONSTANTS.INVENTORY.LOW_STOCK_THRESHOLD) {
      infoMsg += `${product.name}: ${product.count > 0 ? `재고 부족 (${product.count}개 남음)` : '품절'}\n`;
    }
  });
  elements.StockInfoText.textContent = infoMsg;
}

//보너스 포인트 계산후 렌더링
export const renderBonusPoints = () => {
  state.currentBonusPoints = Math.floor(
    state.currentTotalAmount / CONSTANTS.POINTS.EARNING_UNIT,
  );
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = createEl('span', {
      id: 'loyalty-points',
      className: 'text-blue-500 ml-2',
    });
    elements.CartSummary.appendChild(ptsTag);
  }
  ptsTag.textContent = `(포인트: ${state.currentBonusPoints})`;
};
