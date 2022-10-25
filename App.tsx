import React, {useCallback, useContext} from 'react';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export const OrdersContext = React.createContext({
  orders: [],
  setOrders: (item: any) => {},
});

const App = () => {
  const [orders, setOrders] = React.useState([]);

  const handleSetOrders = useCallback(
    item => {
      const newOrders = [...orders, item];
      setOrders(newOrders);
    },
    [orders],
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders: handleSetOrders,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Initial"
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OrdersContext.Provider>
  );
};

export default App;
