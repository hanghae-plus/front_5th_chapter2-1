import { Store } from './Store';
import { deepCopy } from '../utils/deepCopy.js';

// 제품 정보 관리 스토어
export class ItemStore extends Store {
  constructor() {
    super();
    this.state = {
      items: [
        { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
        { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
        { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
        { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
        { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
      ],
    };
  }

  // 상품 목록 상태 가져오기
  getState() {
    return {
      items: deepCopy(this.state.items),
    };
  }

  // 싱글톤 인스턴스 반환
  static getInstance() {
    return (ItemStore.instance ??= new ItemStore());
  }

  // 제품 ID로 제품 찾기
  findItem(itemId) {
    return this.state.items.find((item) => item.id === itemId);
  }

  // 제품 수량 업데이트
  updateItemQuantity(itemId, diff) {
    const item = this.state.items.find((item) => item.id === itemId);
    if (item) {
      item.quantity += diff;
      this.notify(this.getState());
    }
    return this.getState();
  }
}
