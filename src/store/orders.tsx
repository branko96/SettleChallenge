import create from 'zustand';
import { IOrder } from '../interfaces/order';
import { IOrdersStore } from '../interfaces/store/orders';

export const useOrdersStore = create<IOrdersStore>(set => ({
  orders: [],
  lastOrderId: 0,
  addOrder: (item: IOrder) =>
    set(state => {
      const newOrders = [...state.orders, item];
      return { orders: newOrders, lastOrderId: item.id };
    }),
  executeOrder: (orderId: number) =>
    set(state => {
      const updatedData = state.orders.filter(
        (obj: IOrder) => obj.id !== orderId,
      );
      return { orders: updatedData };
    }),
}));
