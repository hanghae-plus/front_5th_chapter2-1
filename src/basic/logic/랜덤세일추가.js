import { 번개세일, 추가할인 } from './index';

export const 랜덤세일추가 = () => {
  setTimeout(() => {
    setInterval(() => 번개세일(), 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => 추가할인(), 60000);
  }, Math.random() * 20000);
};
