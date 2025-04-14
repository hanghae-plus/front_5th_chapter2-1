class BonusPointService {
  constructor() {
    if (BonusPointService.instance) return BonusPointService.instance;
    BonusPointService.instance = this;

    this.bonusPoints = 0;
  }

  resetBonusPoints() {
    this.bonusPoints = 0;
  }

  getBonusPointsFromTotalAmount(amount) {
    this.bonusPoints = Math.floor(amount / 1000);
  }
}

export const bonusPointService = new BonusPointService();
