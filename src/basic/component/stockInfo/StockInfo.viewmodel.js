import ProductModel from '../sel/Sel.Model.js';
import { renderStockInfo } from './StockInfo.js';
export function updateStockInfo() {
  renderStockInfo(ProductModel.getList());
}
