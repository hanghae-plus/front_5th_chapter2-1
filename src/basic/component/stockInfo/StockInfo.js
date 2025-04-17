let $stockInfo;

const STOCK_LIMIT = 5;
const STOCK_MESSAGE = (name, quantity) => {
  return quantity > 0 ? `${name}: 재고 부족 (${quantity}개 남음)` : `${name}: 품절`;
};

function createStockInfoElement() {
  $stockInfo = document.createElement('div');
  $stockInfo.id = 'stock-status';
  $stockInfo.className = 'text-sm text-gray-500 mt-2';
  return $stockInfo;
}

function renderStockInfo(prodList) {
  let infoMsg = '';
  prodList.forEach(function (item) {
    if (item.quantity < STOCK_LIMIT) {
      infoMsg += STOCK_MESSAGE(item.name, item.quantity) + '\n';
    }
  });
  $stockInfo.textContent = infoMsg;
}

export { createStockInfoElement, renderStockInfo };
