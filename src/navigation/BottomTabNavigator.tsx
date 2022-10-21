import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BuySellScreen from '../screens/BuySell';
import OrdersScreen from '../screens/Orders';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={BuySellScreen} />
      <Tab.Screen name="Settings" component={OrdersScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
