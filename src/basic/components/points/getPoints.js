import { CONSTNANTS } from '../../constants';

export const getPoints = (totalAmount) => {
  return Math.floor(totalAmount / CONSTNANTS.POINT_RATE);
};
