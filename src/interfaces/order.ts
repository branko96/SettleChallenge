export interface IOrder {
  id: number;
  total: string;
  price: string;
  amount: string;
  symbol: string;
  priceType: 'limit' | 'market';
  type: 'buy' | 'sell';
}
