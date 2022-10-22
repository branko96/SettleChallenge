import React from 'react';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export const OrdersContext = React.createContext({
  orders: [],
  setOrders: (orders: any[]) => {},
});

const App = () => {
  const [orders, setOrders] = React.useState([]);
  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
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
