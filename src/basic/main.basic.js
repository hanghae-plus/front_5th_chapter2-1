import { SelectedProductStore } from './store/stores';
import { PRODUCT_LIST } from './consts/productList';
import {
  AddButtonDOM,
  CartItemsContainerDOM,
  LayoutDOM,
  ProductSelectDOM,
  StockStatusContainerDOM,
  TotalAmountContainerDOM,
} from './ui';
import { updateProductSelectOptions } from './render';
import { calculateCart } from './logic';

const main = () => {
  ProductSelectDOM.init();
  TotalAmountContainerDOM.init();
  StockStatusContainerDOM.init();
  CartItemsContainerDOM.init();
  AddButtonDOM.init();
  LayoutDOM.init();

  const productSelect = ProductSelectDOM.get();
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const stockStatusContainer = StockStatusContainerDOM.get();
  const cartItemsContainer = CartItemsContainerDOM.get();
  const addButton = AddButtonDOM.get();
  const { mainAppRoot, mainContainer, mainWrapper, mainHeader } =
    LayoutDOM.get();

  updateProductSelectOptions();

  mainWrapper.appendChild(mainHeader);
  mainWrapper.appendChild(cartItemsContainer);
  mainWrapper.appendChild(totalAmountContainer);
  mainWrapper.appendChild(productSelect);
  mainWrapper.appendChild(addButton);
  mainWrapper.appendChild(stockStatusContainer);
  mainContainer.appendChild(mainWrapper);
  mainAppRoot.appendChild(mainContainer);

  calculateCart();

  setTimeout(() => {
    setInterval(() => {
      const luckyItem =
        PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.value = Math.round(luckyItem.value * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateProductSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      const lastSelectedProductId = SelectedProductStore.get('selectedProduct');

      if (lastSelectedProductId) {
        const suggest = PRODUCT_LIST.find(
          (item) => item.id !== lastSelectedProductId && item.quantity > 0,
        );

        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );
          suggest.value = Math.round(suggest.value * 0.95);
          updateProductSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

main();
