import * as React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import { IOrder } from '../../interfaces/order';
import styles from './styles';

interface OrderItemProps {
  order: IOrder;
}

const StyledView = styled(View);

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <>
      <StyledView className="flex-row self-stretch my-2 px-4">
        <StyledView className="flex-1 self-stretch">
          <Text>{order.total}</Text>
        </StyledView>
        <StyledView className="flex-1 self-stretch">
          <Text>{order.symbol}</Text>
        </StyledView>
        <StyledView className="flex-1 self-stretch">
          <Text>{order.amount}</Text>
        </StyledView>
        <StyledView className="flex-1 self-stretch">
          <Text style={styles.textCapitalize}>{order.type}</Text>
        </StyledView>
      </StyledView>
    </>
  );
};

export default OrderItem;
