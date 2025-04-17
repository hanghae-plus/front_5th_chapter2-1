import { productList } from './mock/product-list';
import { luckySaleAlert, recommendOtherProduct } from './utils';
import { calcCart } from './cart';
import { setupEventHandlers } from './eventHandler';
import { inIt, updateSelOpts } from './components';
let lastSel;

function main() {
  //html과 연결
  const root = document.getElementById('app');
  inIt(root);

  //함수
  calcCart();
  updateSelOpts();
  luckySaleAlert(productList, updateSelOpts);
  recommendOtherProduct(productList, lastSel, updateSelOpts);
  setupEventHandlers();
}

main();
