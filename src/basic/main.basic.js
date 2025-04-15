import updateItemOption from './utils/updateOption';
import render from './render';
import caculateCart from './utils/caculateCart';
import alerts from './utils/alerts';
import eventHandler from './utils/eventHandler';

const main = () => {
  updateItemOption();
  render();
  caculateCart();
  alerts();
  eventHandler();
};

main();
