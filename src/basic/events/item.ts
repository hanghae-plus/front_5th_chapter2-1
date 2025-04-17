import { CartItem } from "../component/utils/CartItem";
import { AMOUNT_OF_STOCKS, OUT_OF_STOCKS } from "../context/product";


//카트에 새 아이템을 담는 함수
function addCartItem (item){

  if(item.stock <= 0){
    alert(OUT_OF_STOCKS);
    return;
  }

  const newItem = CartItem(item);
  document.getElementById('cart-items')!.appendChild(newItem);
  item.stock--;  
}

//카트에 담긴 아이템을 추가 버튼으로 추가하는 함수
function updateAddedItem(itemInCart, item){
  let selectSpan = itemInCart.querySelector('span').textContent;
  const currentQty = parseInt(selectSpan.split(AMOUNT_OF_STOCKS)[1]);
  const newQty = currentQty + 1;


  if(item.stock <= 0){
    alert(OUT_OF_STOCKS);
    return;
  }

  itemInCart.querySelector('span').textContent = `${item.name} - ${item.price}원 ${AMOUNT_OF_STOCKS} ${newQty}`;
  item.stock--;
}


//카트에 담긴 아이템을 -/+ 버튼으로 조정하는 함수
function changeCartItem(itemElem, tgt, prod) {
    let selectSpan = itemElem.querySelector('span').textContent;

    const qtyChange = parseInt(tgt.dataset.change);
    const currentQty = parseInt(selectSpan.split(AMOUNT_OF_STOCKS)[1]);
    const newQty = currentQty + qtyChange;
    const maxStock = prod.stock;
    
    if(newQty <= 0){
      itemElem.remove();
      prod.stock -= qtyChange;
      return;
    }

    if(prod.stock <= 0){
      alert(OUT_OF_STOCKS);
      return;
    }

    itemElem.querySelector('span').textContent = itemElem.querySelector('span').textContent.split(AMOUNT_OF_STOCKS)[0] + AMOUNT_OF_STOCKS + newQty;
    prod.stock--;
}


//카트에 담은 아이템을 완전히 삭제하는 함수
function removeCartItem(itemElem, prod){
    const remQty = parseInt(itemElem.querySelector('span').textContent.split(AMOUNT_OF_STOCKS)[1]);
    
    prod.stock += remQty;
    itemElem.remove();
}

export { addCartItem, updateAddedItem, changeCartItem, removeCartItem };