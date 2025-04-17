import { useEffect } from 'react';
import {
  LUCKY_TIMEOUT,
  SUGGEST_TIMEOUT,
  LUCKY_INTERVAL,
  SUGGEST_INTERVAL,
} from '../utils/alerts/alertConstants';
import lucky from '../utils/alerts/lucky';
import suggest from '../utils/alerts/suggest';

const TIMEOUTS = [LUCKY_TIMEOUT, SUGGEST_TIMEOUT];
const INTERVALS = [LUCKY_INTERVAL, SUGGEST_INTERVAL];
const INNER_FUNCTIONS = [lucky, suggest];

const useAlert = () => {
  useEffect(() => {
    for (let i = 0; i < TIMEOUTS.length; i++) {
      setTimeout(() => {
        setInterval(() => {
          INNER_FUNCTIONS[i]();
        }, INTERVALS[i]);
      }, TIMEOUTS[i]);
    }
  }, []);
};

export default useAlert;
