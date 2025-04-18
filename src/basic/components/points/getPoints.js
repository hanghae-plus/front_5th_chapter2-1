import { CONSTANTS } from '../../constants';

export const getPoints = (totalAmount) => {
  return Math.floor(totalAmount / CONSTANTS.POINT_RATE);
};
