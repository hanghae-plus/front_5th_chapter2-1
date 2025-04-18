const ERROR_MESSAGES = {
  // 세일 시스템 관련 에러
  SALE_SYSTEM: {
    FLASH_SALE_ERROR: '번개 세일 실행 중 오류가 발생했습니다.',
    SUGGESTION_ERROR: '추천 상품 실행 중 오류가 발생했습니다.',
    NO_PRODUCTS: '판매 가능한 상품이 없습니다.',
    PRODUCT_LIST_EMPTY: '상품 목록이 비어있습니다.',
    UPDATE_FAILED: '상품 옵션 업데이트에 실패했습니다.',
  },

  // 상품 관련 에러
  PRODUCT: {
    NO_STOCK: '재고가 부족합니다.',
    INVALID_PRICE: '상품 가격이 유효하지 않습니다.',
    NOT_FOUND: '상품을 찾을 수 없습니다.',
  },

  // 상태 관련 에러
  STATE: {
    NO_LAST_SELECTION: '최근 선택한 상품 정보가 없습니다.',
    INVALID_STATE: '상태 정보가 유효하지 않습니다.',
  },

  // 타이머 관련 에러
  TIMER: {
    INTERVAL_ERROR: '타이머 간격 설정 중 오류가 발생했습니다.',
    TIMEOUT_ERROR: '지연 시간 설정 중 오류가 발생했습니다.',
  },

  // 알림 관련 에러
  ALERT: {
    DISPLAY_ERROR: '알림 표시 중 오류가 발생했습니다.',
  },
};

export default ERROR_MESSAGES;
