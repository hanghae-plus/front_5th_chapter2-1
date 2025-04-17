import { Product } from './product';

export enum EventType {
  FLASH = 'flash',
  SUGGEST = 'suggest',
}

export interface EventConfig {
  delay: () => number;
  interval: number;
  discountRate: number;
  messageTemplate: (name: string) => string;
  condition: ((product: Product) => boolean) | boolean;
}

export type EventConfigs = Record<EventType, EventConfig>;
