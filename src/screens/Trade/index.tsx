import * as React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { useCallback, useEffect, useRef, useState } from 'react';
import Picker from '../../components/Picker';
import { getSymbolRates } from '../../services/binance';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { useOrdersStore } from '../../store/orders';
import styles from './styles';
import { symbols, TIME_LIMIT_OPENED } from '../../constants';

const StyledPressable = styled(Pressable);
const StyledView = styled(View);

function BuySellScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('limit');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');
  const [marketPrice, setMarketPrice] = useState('');
  const { executeOrder, addOrder, lastOrderId } = useOrdersStore();
  const timerRef = useRef();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleAmountChange = useCallback((text: string) => {
    setAmount(text);
  }, []);

  const handlePriceChange = useCallback((text: string) => {
    setPrice(text);
  }, []);

  useEffect(() => {
    if (priceType === 'market') {
      (async () => {
        const data = await getSymbolRates(`${selectedSymbol}USDT`);
        setMarketPrice(data.data.price);
      })();
    }
  }, [selectedSymbol, priceType]);

  const handleSubmit = useCallback(async () => {
    if (price === '' || amount === '') {
      Toast.show({
        type: 'error',
        text1: 'Complete all required fields',
      });
      return;
    }

    const currentOrderId = lastOrderId + 1;

    if (priceType === 'limit') {
      addOrder({
        id: currentOrderId,
        amount,
        price,
        symbol: selectedSymbol,
        priceType,
        total: Number(+amount * +price).toFixed(2),
        type: activeTab === 1 ? 'buy' : 'sell',
      });

      timerRef.current = setTimeout(() => {
        executeOrder(currentOrderId);
      }, TIME_LIMIT_OPENED);
    }

    Toast.show({
      type: priceType === 'market' ? 'success' : 'info',
      text1:
        priceType === 'market'
          ? 'Order created successfully'
          : 'Order time running, you can see this order in book',
    });
  }, [
    activeTab,
    addOrder,
    amount,
    lastOrderId,
    price,
    priceType,
    selectedSymbol,
    executeOrder,
  ]);

  const handleSuggestion = useCallback(async () => {
    const { data } = await getSymbolRates(`${selectedSymbol}USDT`);
    setPrice(data.price);
  }, [selectedSymbol]);

  const isLimit = priceType === 'limit';
  const isBuy = activeTab === 1;

  return (
    <StyledView className="">
      <StyledView className="container">
        <StyledView className="flex flex-col items-center justify-center">
          <StyledView className="flex flex-row">
            <StyledPressable
              onPress={() => setActiveTab(1)}
              className={`flex-1 px-4 py-2 text-gray-600 bg-white rounded shadow ${
                activeTab === 1 && 'bg-gray-200'
              }`}>
              <Text>Buy</Text>
            </StyledPressable>
            <StyledPressable
              onPress={() => setActiveTab(2)}
              className={`flex-1 px-4 py-2 text-gray-600 bg-white rounded shadow-lg ${
                activeTab === 2 && 'bg-gray-200'
              }`}>
              <Text>Sell</Text>
            </StyledPressable>
          </StyledView>
          <StyledView className="px-8 w-full">
            <StyledView className="mt-6 bg-white p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <StyledView>
                <StyledView className="flex-row">
                  <StyledView className="w-full">
                    <StyledView className="items-center flex">
                      <Text>Symbol</Text>
                      <Picker
                        selectedValue={selectedSymbol}
                        items={symbols}
                        setSelectedValue={setSelectedSymbol}
                      />
                    </StyledView>
                    <Text>Amount</Text>
                    <TextInput
                      value={amount.toString()}
                      keyboardType="decimal-pad"
                      style={styles.input}
                      placeholder="Amount"
                      onChangeText={handleAmountChange}
                    />
                    <StyledView className="flex-row justify-between mt-2">
                      <Text>Price</Text>
                      <StyledPressable
                        className="flex-row"
                        onPress={handleSuggestion}>
                        <Icon name="help-circle" size={20} />
                        <Text>Current Price</Text>
                      </StyledPressable>
                    </StyledView>
                    <TextInput
                      value={!isLimit ? marketPrice : price}
                      editable={isLimit}
                      keyboardType="decimal-pad"
                      onChangeText={handlePriceChange}
                      style={[styles.input, !isLimit && styles.opacity]}
                      placeholder={!isLimit ? 'Market Price' : 'Price'}
                    />
                    <StyledView className="flex flex-row justify-around my-2">
                      <StyledPressable
                        className="justify-center items-center"
                        onPress={() => setPriceType('limit')}>
                        <StyledView className="border rounded-full w-7 p-1">
                          <StyledView
                            className={`rounded-full p-2 ${
                              isLimit && 'bg-black'
                            }`}
                          />
                        </StyledView>
                        <Text>Limit</Text>
                      </StyledPressable>
                      <StyledPressable
                        className="justify-center items-center"
                        onPress={() => setPriceType('market')}>
                        <StyledView className="border rounded-full w-7 p-1">
                          <StyledView
                            className={`rounded-full p-2 ${
                              !isLimit && 'bg-black'
                            }`}
                          />
                        </StyledView>
                        <Text>Market</Text>
                      </StyledPressable>
                    </StyledView>
                    {!isLimit && isBuy && amount ? (
                      <Text>
                        You will receive {amount} {selectedSymbol} paying{' '}
                        {+marketPrice * +amount} USD
                      </Text>
                    ) : !isLimit && !isBuy && amount ? (
                      <Text>
                        You will receive {+marketPrice * +amount} USD paying{' '}
                        {amount} {selectedSymbol}
                      </Text>
                    ) : null}
                  </StyledView>
                </StyledView>
                <StyledPressable
                  onPress={handleSubmit}
                  className={`${
                    isBuy
                      ? 'bg-red-500 border-red-400'
                      : 'bg-green-500 border-green-400'
                  } px-4 py-2 mt-2 text-gray-600 justify-center text-center bg-primary border rounded-xl shadow`}>
                  <Text style={styles.buttonText}>
                    {activeTab === 1 ? 'BUY' : 'SELL'}
                  </Text>
                </StyledPressable>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default BuySellScreen;
