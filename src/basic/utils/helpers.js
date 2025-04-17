// 기타 유틸리티 함수

// 오브젝트 깊은 복사 함수
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 화요일인지 확인하는 함수
export function isTuesday() {
  return new Date().getDay() === 2;
}

// 금액 포맷팅 함수
export function formatPrice(amount) {
  return Math.round(amount) + '원';
}

// 퍼센트 포맷팅 함수
export function formatPercent(rate) {
  return (rate * 100).toFixed(1) + '%';
}
