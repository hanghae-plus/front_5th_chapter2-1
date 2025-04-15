import updateSelectOptions from './updater/updateSelectOptions';
import render from './render';
import updateCart from './updater/updateCart';
import alerts from './alerts/alerts';
import eventHandler from './events/eventHandler';

const main = () => {
  updateSelectOptions();
  render();
  updateCart();
  alerts();
  eventHandler();
};

main();
