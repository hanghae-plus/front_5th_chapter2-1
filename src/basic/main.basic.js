import { setEventListener } from './events/setEventListener';
import { setTimer } from './service/setTimer';
import { renderUi } from './ui/renderUi';

const main = () => {
  renderUi();
  setEventListener();
  setTimer();
};

main();
