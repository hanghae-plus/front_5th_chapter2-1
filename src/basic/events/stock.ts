import { PRODUCTS } from "../context/product";
import { createElement } from "../hooks/createElement";

//선택 가능한 재고 드롭다운
function updateStockOption() {
  const addProduct = createElement('select', { 
    id: `product-select`,
    className: `border rounded p-2 mr-2`,
    innerHTML: ''}
  );

  PRODUCTS.forEach(function (item) {

    const option = createElement('option', {
      value: item.id,
      textContent: `${item.name} - ${item.price}원`,
    })

    if(item.stock === 0){
      option.disabled = true;
    }

    addProduct.appendChild(option);
  });

  return addProduct;

}
  
//잔여 재고 확인 함수
function updateStockInfo() {
    let infoMsg='';
    const $stockInfo = document.getElementById(`stock-status`);

    PRODUCTS.forEach(function (item) {
        if(item.stock < 5) {
          infoMsg += `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : '품절'} \n`;
        }
    });
    
    $stockInfo.textContent = infoMsg;
    
}

export {updateStockOption, updateStockInfo};