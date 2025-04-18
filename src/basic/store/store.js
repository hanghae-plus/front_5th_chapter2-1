// 전역 상태 관리 시스템을 구현하기 위한 Store 클래스
export class Store {
  constructor() {
    this.observers = new Set();
  }

  // 옵저버 등록
  subscribe(observer) {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  // 옵저버들에게 데이터 전달
  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }

  // 상태 업데이트 메서드 (하위 클래스에서 구현 필요)
  getState() {
    throw new Error('getState 메서드는 구현되어야 합니다.');
  }
}
