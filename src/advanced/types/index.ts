export type Product = {
  id: string;
  name: string;
  cost: number;
  quantity: number;
  discount: number;
};

export type Cart = { [id: string]: number };

export const PLUS_MINUS = {
  PLUS: "+",
  MINUS: "-",
} as const;

export type PlusMinus = (typeof PLUS_MINUS)[keyof typeof PLUS_MINUS];
