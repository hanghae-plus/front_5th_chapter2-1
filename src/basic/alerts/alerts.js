import { LUCKY_INTERVAL, LUCKY_TIMEOUT, SUGGEST_INTERVAL, SUGGEST_TIMEOUT } from './constants';
import { lucky } from './lucky';
import { suggest } from './suggest';

const TIMEOUTS = [LUCKY_TIMEOUT, SUGGEST_TIMEOUT];
const INTERVALS = [LUCKY_INTERVAL, SUGGEST_INTERVAL];
const INNER_FUNCTIONS = [lucky, suggest];

const alerts = () => {
  for (let i = 0; i < TIMEOUTS.length; i++) {
    setTimeout(() => {
      setInterval(() => {
        INNER_FUNCTIONS[i]();
      }, INTERVALS[i]);
    }, TIMEOUTS[i]);
  }
};

export default alerts;
