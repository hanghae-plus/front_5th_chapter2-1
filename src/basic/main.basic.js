
import { $Container, WrappedContainer } from "./component/Container";
import { updateStockOption, updateStockInfo } from "./events/stock";
import { setupItemEvent } from "./eventHandler";
import { updateReceipt } from "./events/receipt";
import { discountAlert, recommandAlert } from "./events/alert";


let lastProduct;

function main() {

  const root = document.getElementById('app');
  const container = $Container;
  const wrapper = WrappedContainer();

  container.appendChild(wrapper);
  root.appendChild(container);
  
  updateStockOption();
  updateStockInfo();
  updateReceipt();

  setupItemEvent(lastProduct);


  
  //할인 알람
  setTimeout( discountAlert, Math.random() * 10000);

  //추가 구매 제안 알람
  setTimeout( recommandAlert, Math.random() * 20000 );
};




main();



