import { PRODUCTS } from "./context/product";
import { addCartItem, updateAddedItem, changeCartItem, removeCartItem } from "./events/item";
import { updateReceipt } from "./events/receipt";


function setupItemEvent(){
    document.getElementById('add-to-cart')!.addEventListener('click', handleAddItem);
    document.getElementById('cart-items')?.addEventListener('click', handleClickCartItem);
}

function handleAddItem(){
    const productOption = document.getElementById('product-select') as HTMLSelectElement;
    const selItem = productOption.value;
    const itemToAdd = PRODUCTS.find(function (p) {
        return p.id === selItem;
    });

    const item = document.getElementById(itemToAdd.id);

    if(item){
        updateAddedItem(item, itemToAdd);
    } else {
        addCartItem(itemToAdd);
    }

    updateReceipt();
}


function handleClickCartItem(event){
    const tgt = event.target;
    
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);

    const prod = PRODUCTS.find(function (p) {
        return p.id === prodId;
    });

    if(tgt.classList.contains('quantity-change')) {
        changeCartItem(itemElem, tgt, prod);
    }

    if(tgt.classList.contains('remove-item')) {
        removeCartItem(itemElem, tgt);
    }

    updateReceipt();
}

export {setupItemEvent};