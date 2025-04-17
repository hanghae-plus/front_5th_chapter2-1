import { updateStockOption } from "../events/stock";
import { createElement } from "../hooks/createElement";
import { Header } from './Header';
import { TotalPrice } from './Total';
import { addButton } from './utils/AddButton';
import { cartItemList } from "./utils/CartItem";
import { StockInfo } from './utils/StockInfo';

const WrappedContainer = () => {
  const wrapper = createElement('div', { className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'});

  wrapper.appendChild(Header);
  wrapper.appendChild(cartItemList);
  wrapper.appendChild(TotalPrice);
  wrapper.appendChild(updateStockOption());
  wrapper.appendChild(addButton);
  wrapper.appendChild(StockInfo);

  return wrapper;
};

const $Container = createElement(
    'div',
    { 
      className: 'bg-gray-100 p-8'
    }
)

export { WrappedContainer, $Container };