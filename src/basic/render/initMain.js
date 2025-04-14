import {
  ProductSelectDOM,
  TotalAmountContainerDOM,
  StockStatusContainerDOM,
  CartItemsContainerDOM,
  AddButtonDOM,
  LayoutDOM,
} from '../ui';
import { updateProductSelectOptions } from './updateProductSelectOptions';
import { calculateCart } from '../logic';

export const initMain = () => {
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

  mainWrapper.appendChild(mainHeader);
  mainWrapper.appendChild(cartItemsContainer);
  mainWrapper.appendChild(totalAmountContainer);
  mainWrapper.appendChild(productSelect);
  mainWrapper.appendChild(addButton);
  mainWrapper.appendChild(stockStatusContainer);
  mainContainer.appendChild(mainWrapper);
  mainAppRoot.appendChild(mainContainer);

  updateProductSelectOptions();
  calculateCart();
};
