export interface Product {
    id: string;
    name: string;
    description: string;
    type: string;
    price: number;
    available: number;
    img: string;
}

export type AppliedOffers = {
  coke: boolean;
  coffee: boolean;
};