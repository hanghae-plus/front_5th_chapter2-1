export const DISCOUNT_RATIO = {
    THUNDER: 0.2, // 번개 20%
    ADDITIONAL: 0.05, // 추가 5%
    EACH_PRODUCT: {
      // 각 제품 10개 이상이면 할인
      QUANTITY: 10,
      RATIO: {
        p1: 0.1,
        p2: 0.15,
        p3: 0.2,
        p4: 0.05,
        p5: 0.25,
      },
    },
    ALL_PRODUCT: {
      // 제품 관계없이 total 30개 이상이면 할인
      QUANTITY: 30,
      RATIO: 0.25,
    },
  };