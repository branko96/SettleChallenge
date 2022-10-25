import * as React from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {styled, useColorScheme} from 'nativewind';
import {useCallback, useContext, useState} from 'react';
import {OrdersContext} from '../../App';

const StyledPressable = styled(Pressable);
const StyledView = styled(View);

function BuySellScreen() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [openTab, setOpenTab] = useState(1);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceType, setPriceType] = useState('limit');
  const context = useContext(OrdersContext);

  const handleAmountChange = useCallback(e => {
    console.log(e);
    setAmount(e);
  }, []);

  const handlePriceChange = useCallback(e => {
    setPrice(e);
  }, []);

  const handleSubmit = useCallback(() => {
    context.setOrders({amount, price});
  }, [amount, context, price]);

  return (
    <StyledView className="">
      <StyledView className="container">
        <StyledView className="flex flex-col items-center justify-center">
          <StyledView className="flex flex-row">
            <StyledPressable
              onPress={() => setOpenTab(1)}
              className={`flex-1 px-4 py-2 text-gray-600 bg-white rounded shadow ${
                openTab === 1 && 'bg-secondary'
              }`}>
              <Text>Buy</Text>
            </StyledPressable>
            <StyledPressable
              onPress={() => setOpenTab(2)}
              className={`flex-1 px-4 py-2 text-gray-600 bg-white rounded shadow-lg ${
                openTab === 2 && 'bg-secondary'
              }`}>
              <Text>Sell</Text>
            </StyledPressable>
          </StyledView>
          <StyledView className="flex p-3 mt-6 bg-white border">
            <StyledView>
              {openTab === 1 && (
                <StyledView className="flex-row">
                  <StyledView>
                    <Text>Symbol</Text>
                    <Text>Amount</Text>
                    <TextInput
                      value={amount}
                      keyboardType="decimal-pad"
                      onChangeText={handleAmountChange}
                    />
                    <Text>Price</Text>
                    <StyledView className="flex flex-row">
                      <StyledPressable
                        className="flex-1"
                        onPress={() => setPriceType('limit')}>
                        <StyledView
                          className={`rounded-lg border p-1 ${
                            priceType === 'limit' && 'bg-black'
                          }`}
                        />
                        <Text>Limit</Text>
                      </StyledPressable>
                      <StyledPressable
                        className="flex-1"
                        onPress={() => setPriceType('market')}>
                        <StyledView
                          className={`rounded-lg border p-1 ${
                            priceType === 'market' && 'bg-black'
                          }`}
                        />
                        <Text>Market</Text>
                      </StyledPressable>
                    </StyledView>
                    {priceType === 'limit' && (
                      <TextInput
                        value={price}
                        onChangeText={handlePriceChange}
                      />
                    )}
                  </StyledView>
                </StyledView>
              )}
              <StyledPressable
                onPress={handleSubmit}
                className="px-4 py-2 text-gray-600 bg-primary border rounded shadow">
                <Text>BUY</Text>
              </StyledPressable>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default BuySellScreen;
