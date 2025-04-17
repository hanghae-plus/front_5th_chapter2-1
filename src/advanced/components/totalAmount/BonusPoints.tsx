import { calculateBonusPoints } from "@/advanced/utils";
import { DOM_IDS, STYLES } from "@/basic/consts";

export const BonusPoints = ({totalAmount}: {totalAmount: number}) => {
  const bonusPoints = calculateBonusPoints(totalAmount);
  
  return <span id={DOM_IDS.CART.POINTS} className={STYLES.TEXT.BONUS}>(포인트: {bonusPoints})</span>;
};