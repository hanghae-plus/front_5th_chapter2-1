import { dom } from '../store';
import { productList } from '../mock/product-list';

export function updateStockInfo() {
  //재고 문구 분기처리
  const lowStockItems = productList
    .filter((stockItem) => stockItem.stock < 5)
    .map((item) => {
      return `<li>${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : '품절'}</li>`;
    });
  //innerHTM?L
  dom.stockInfo.innerHTML = `<ul class="text-sm list-disc pl-4">${lowStockItems.join('')}</ul>`;
}
