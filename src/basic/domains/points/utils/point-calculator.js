import { state } from '../../../core/state';

/**
 * 포인트 계산
 * @returns {number} 포인트
 */
const calculateLoyaltyPoints = () => {
  return Math.floor(state.totalAmount / 1000);
};

export { calculateLoyaltyPoints };
