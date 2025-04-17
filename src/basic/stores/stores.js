class RecentSelectedId {
  constructor() {
    this.recentSelectedId = 0;
  }

  get() {
    return this.recentSelectedId;
  }

  set(id) {
    this.recentSelectedId = id;
  }
}

class TotalPrice {
  constructor() {
    this.totalPrice = 0;
  }

  get() {
    return this.totalPrice;
  }

  set(totalPrice) {
    this.totalPrice = totalPrice;
  }
}

export { RecentSelectedId, TotalPrice };
