import { RenderBonusPoint } from "../component/utils/BonusPoint";


function bonusPoint(totalAmount){
  const BonusPoint = Math.floor(totalAmount / 1000);
  let pointTag = document.getElementById(`loyalty-points`);

  if(!pointTag){
    document.getElementById(`cart-total`)?.appendChild(RenderBonusPoint);
    pointTag = RenderBonusPoint;
  }

  pointTag.textContent = `(포인트: ${BonusPoint})`;
}

export { bonusPoint };