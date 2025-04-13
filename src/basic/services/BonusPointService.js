class BonusPointsService {
  constructor() {
    this._bonusPoints = 0;
  }

  get bonusPoints() {
    return this._bonusPoints;
  }

  set bonusPoints(totalAmt) {
    this._bonusPoints = Math.floor(totalAmt / 1000);
  }

  renderBonusPts() {
    let ptsTag = document.getElementById("loyalty-points");
    if (!ptsTag) {
      ptsTag = document.createElement("span");
      ptsTag.id = "loyalty-points";
      ptsTag.className = "text-blue-500 ml-2";
      const sum = document.getElementById("cart-total");
      sum.appendChild(ptsTag);
    }
    ptsTag.textContent = "(포인트: " + this.bonusPoints + ")";
  }
}

export const bonusPointsService = new BonusPointsService();
