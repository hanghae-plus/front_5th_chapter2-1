import updateSelectOptions from './utils/updateSelectOptions';
import render from './render';
import updateCart from './utils/updateCart';
import alerts from './utils/alerts/alerts';
import eventHandler from './events/eventHandler';

const main = () => {
  updateSelectOptions();
  render();
  updateCart();
  alerts();
  eventHandler();
};

main();
