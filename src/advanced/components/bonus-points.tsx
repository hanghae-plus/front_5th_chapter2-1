import React from "react";

function BonusPoint({ finalTotal }: { finalTotal: number }) {
  const bonusPoints = Math.floor(finalTotal / 1000);
  return (
    <span id="loyalty-points" className="text-blue-500 ml-2">
      (포인트: <span>{bonusPoints}</span>)
    </span>
  );
}

export default BonusPoint;
