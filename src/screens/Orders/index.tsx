import * as React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import OrderItem from '../../components/OrderItem';
import { styled } from 'nativewind';
import { useOrdersStore } from '../../store/orders';
import { IOrder } from '../../interfaces/order';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

function OrdersScreen() {
  const { orders } = useOrdersStore();
  const [sorted, setSorted] = useState<IOrder[]>([]);

  useEffect(() => {
    const sortedOrders = orders.sort((a, b) => {
      if (a.total < b.total) {
        return -1;
      }
      if (a.total > b.total) {
        return 1;
      }
      return 0;
    });
    setSorted(sortedOrders);
  }, [orders]);

  return (
    <StyledView className="flex-1">
      <StyledView className="flex-row self-stretch px-4 mt-2">
        <StyledPressable onPress={() => {}} className="flex-1 self-stretch">
          <StyledText className="text-black font-bold">Total Price</StyledText>
        </StyledPressable>
        <StyledView className="flex-1 self-stretch">
          <StyledText className="text-black font-bold">Symbol</StyledText>
        </StyledView>
        <StyledView className="flex-1 self-stretch">
          <StyledText className="text-black font-bold">Amount</StyledText>
        </StyledView>
        <StyledView className="flex-1 self-stretch">
          <StyledText className="text-black font-bold">Type</StyledText>
        </StyledView>
      </StyledView>
      <FlatList
        keyExtractor={item => `${item?.id}`}
        renderItem={({ item }: { item: IOrder }) => {
          return <OrderItem order={item} />;
        }}
        data={sorted}
      />
    </StyledView>
  );
}

export default OrdersScreen;
