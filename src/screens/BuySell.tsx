import * as React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styled, useColorScheme} from 'nativewind';
import {useContext, useState} from 'react';
import {OrdersContext} from '../../App';

const StyledPressable = styled(Pressable);
const StyledView = styled(View);
const StyledText = styled(Text);

function BuySellScreen() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [openTab, setOpenTab] = useState(1);
  const context = useContext(OrdersContext);

  return (
    <StyledView className="">
      <StyledView className="container mx-auto">
        <StyledView className="flex flex-col items-center justify-center max-w-xl">
          <StyledView className="flex flex-row space-x-2">
            <StyledView>
              <StyledPressable
                onPress={() => setOpenTab(1)}
                className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                <Text>Limit</Text>
              </StyledPressable>
            </StyledView>
            <View>
              <StyledPressable
                onPress={() => setOpenTab(2)}
                className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                <Text>Market</Text>
              </StyledPressable>
            </View>
          </StyledView>
          <StyledView className="p-3 mt-6 bg-white border">
            <StyledView className={openTab === 1 ? 'block' : 'hidden'}>
              <StyledView className="flex-row">
                <StyledView>
                  <Text>Symbol</Text>
                  <Text>Amount</Text>
                  <Text>Symbol</Text>
                  <Text>Price</Text>
                </StyledView>
              </StyledView>
              <StyledPressable
                onPress={() => context.setOrders([1])}
                className="px-4 py-2 text-gray-600 bg-primary rounded shadow">
                <Text>BUUUUY</Text>
              </StyledPressable>
            </StyledView>
            <StyledView className={openTab === 2 ? 'block' : 'hidden'}>
              {context.orders.map(order => (
                <Text>{order}</Text>
              ))}
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default BuySellScreen;
