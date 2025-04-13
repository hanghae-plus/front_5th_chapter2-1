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
}

export const bonusPointsService = new BonusPointsService();
