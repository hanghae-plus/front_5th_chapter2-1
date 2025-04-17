export const calculatePoints = (amount: number, conversionRate = 1000) => {
  return Math.floor(amount / conversionRate);
};
