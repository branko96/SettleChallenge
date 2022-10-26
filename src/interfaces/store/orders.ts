import { IOrder } from '../order';

export interface IOrdersStore {
  orders: IOrder[];
  lastOrderId: number;
  addOrder: (order: IOrder) => void;
  executeOrder: (orderId: number) => void;
}
