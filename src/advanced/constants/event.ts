import { EventType, EventConfigs } from '../types/event';

export const eventConfigs: EventConfigs = {
  [EventType.FLASH]: {
    delay: () => Math.random() * 10000,
    interval: 30000,
    discountRate: 0.2,
    messageTemplate: (name: string) => `번개세일! ${name}이(가) 20% 할인 중입니다!`,
    condition: () => Math.random() < 0.3,
  },
  [EventType.SUGGEST]: {
    delay: () => Math.random() * 20000,
    interval: 60000,
    discountRate: 0.05,
    messageTemplate: (name: string) => `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    condition: true,
  },
};
