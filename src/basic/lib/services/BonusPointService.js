class BonusPointService {
  constructor() {
    this.bonusPoints = 0;
  }

  applyBonusPoints(totalPrice) {
    this.bonusPoints = Math.floor(totalPrice / 1000);
  }
}

export const bonusPointService = new BonusPointService();
