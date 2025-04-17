import { AppContext } from './context/AppContext';
import ProductList from './data/Product.json'; //상품 데이터 Json
import { createUI } from './component/createUi'; //화면 그려주는 곳
import * as Utils from './utils/index.js';
import * as Services from './services/index.js';

function main() {
  const ui = createUI();

  AppContext.cartDisp = ui.cartDisp;
  AppContext.sum = ui.sum;
  AppContext.sel = ui.sel;
  AppContext.addBtn = ui.addBtn;
  AppContext.stockInfo = ui.stockInfo;
  AppContext.productList = ProductList;

  //품절 상품 보여주기
  Utils.updateSelOpts(AppContext);
  //장바구니 계산
  Utils.calcCart(AppContext);

  AppContext.addBtn.addEventListener('click', () =>
    Utils.handleAddtoCart(AppContext)
  );
  AppContext.cartDisp.addEventListener('click', (e) =>
    Utils.handleCartActions(e, AppContext)
  );

  //번개세일
  Services.flashSale(AppContext);

  //제품제안
  Services.suggestionSale(AppContext);
}

main();
