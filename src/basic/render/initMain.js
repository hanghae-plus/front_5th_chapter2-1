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

const initAllDOM = () => {
  ProductSelectDOM.init();
  TotalAmountContainerDOM.init();
  StockStatusContainerDOM.init();
  CartItemsContainerDOM.init();
  AddButtonDOM.init();
  LayoutDOM.init();
};

const buildMainLayout = () => {
  const productSelect = ProductSelectDOM.get();
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const stockStatusContainer = StockStatusContainerDOM.get();
  const cartItemsContainer = CartItemsContainerDOM.get();
  const addButton = AddButtonDOM.get();
  const { mainAppRoot, mainContainer, mainWrapper, mainHeader } =
    LayoutDOM.get();

  mainWrapper.append(
    mainHeader,
    cartItemsContainer,
    totalAmountContainer,
    productSelect,
    addButton,
    stockStatusContainer,
  );

  mainContainer.appendChild(mainWrapper);
  mainAppRoot.appendChild(mainContainer);
};

const initializeState = () => {
  updateProductSelectOptions();
  calculateCart();
};

export const initMain = () => {
  initAllDOM();
  buildMainLayout();
  initializeState();
};
