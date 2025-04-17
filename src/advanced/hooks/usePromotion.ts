import { useEffect } from 'react';
import {
  LUCKY_TIMEOUT,
  SUGGEST_TIMEOUT,
  LUCKY_INTERVAL,
  SUGGEST_INTERVAL,
} from '../utils/promotion/constants';
import lucky from '../utils/promotion/lucky';
import suggest from '../utils/promotion/suggest';

const TIMEOUTS = [LUCKY_TIMEOUT, SUGGEST_TIMEOUT];
const INTERVALS = [LUCKY_INTERVAL, SUGGEST_INTERVAL];
const INNER_FUNCTIONS = [lucky, suggest];

const usePromotion = () => {
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

export default usePromotion;
