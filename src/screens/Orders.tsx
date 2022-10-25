import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useCallback, useContext} from 'react';
import {styled} from 'nativewind';
import {OrdersContext} from '../../App';

const StyledView = styled(View);

function OrdersScreen() {
  const context = useContext(OrdersContext);

  const renderItem = useCallback(({item}) => {
    return (
      <StyledView className="flex flex-row space-x-2">
        <StyledView>
          <Text>{item.price}</Text>
        </StyledView>
        <StyledView>
          <Text>{item.amount}</Text>
        </StyledView>
      </StyledView>
    );
  }, []);

  return (
    <View>
      <Text>Orders</Text>
      <FlatList renderItem={renderItem} data={context.orders} />
    </View>
  );
}

export default OrdersScreen;
