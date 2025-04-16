import { dom } from '../store';
import { productList } from '../mock/product-list';

export function updateSelOpts() {
  dom.sel.innerHTML = productList
    .map((item) => {
      const disabled = item.stock === 0 ? 'disabled' : '';
      return `
      <option value=${item.id} ${disabled}>${item.name} - ${item.val}원</option>
    `;
    })
    .join('');
}
