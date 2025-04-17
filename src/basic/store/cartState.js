// cartState.js
export const createCartState = () => {
  // 상태 변수
  let totalAmount = 0;
  let itemCount = 0;
  let bonusPoints = 0;
  let discountRate = 0;

  return {
    // 게터
    getTotalAmount: () => totalAmount,
    getItemCount: () => itemCount,
    getBonusPoints: () => bonusPoints,
    getDiscountRate: () => discountRate,

    // 세터
    setTotalAmount: (value) => {
      totalAmount = value;
    },
    setItemCount: (value) => {
      itemCount = value;
    },
    setBonusPoints: (value) => {
      bonusPoints = value;
    },
    setDiscountRate: (value) => {
      discountRate = value;
    },

    // 값 초기화
    reset: () => {
      totalAmount = 0;
      itemCount = 0;
      bonusPoints = 0;
      discountRate = 0;
    },
  };
};

// 싱글톤 인스턴스 생성
export const cartState = createCartState();
