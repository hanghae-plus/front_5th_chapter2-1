
import { prodList } from "../data/product";
import { makeUI } from "../ui/makeUI";
import { calculateCartTotals, calculateDiscount, displayPriceInfo } from "../utils/calc";



const renderBonusPoints=(totalAmount,sum) => {
  const bonusPoints = Math.floor(totalAmount / 1000);
  let pointsTag = document.getElementById('loyalty-points');

  if(!pointsTag) {
    pointsTag = document.createElement('span');
    pointsTag.id = 'loyalty-points';
    pointsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(pointsTag);
  }

  pointsTag.textContent='(포인트: ' + bonusPoints + ')';
};


function updateStockInfo(stockInfo) {
  let infoMsg = '';

  prodList.forEach(function (item) {
    if(item.q < 5) {infoMsg += item.name + ': ' + (item.q > 0 ? '재고 부족 ('+item.q+'개 남음)' : '품절') + '\n';
    }
  });
  
  stockInfo.textContent=infoMsg;
}



const calculateCart = () =>{

  const {cartDisplay,stockInfo,sum} = makeUI();
  const cartItems = cartDisplay.children;

  const {subTotal,itemCount,totalAmount} = calculateCartTotals(cartItems,prodList);
  const {discountRate} = calculateDiscount(itemCount,totalAmount,subTotal);
  displayPriceInfo(sum,totalAmount,discountRate);

  updateStockInfo(stockInfo);
  renderBonusPoints(totalAmount,sum);


}

export { calculateCart };
