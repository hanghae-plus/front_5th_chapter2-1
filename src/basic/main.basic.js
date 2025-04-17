import updateSelectOptions from './updater/updateSelectOptions';
import render from './render';
import updateCart from './updater/updateCart';
import eventHandler from './events/eventHandler';
import promotion from './promotion/promotion';

const main = () => {
  updateSelectOptions();
  updateCart();
  promotion();
  eventHandler();
  render();
};

main();
