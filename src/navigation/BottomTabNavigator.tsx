import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BuySellScreen from '../screens/Trade';
import OrdersScreen from '../screens/Orders';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trade"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="logo-bitcoin"
                size={20}
                color={focused ? color : 'gray'}
              />
            );
          },
        }}
        component={BuySellScreen}
      />
      <Tab.Screen
        name="Orders"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon name="book" size={20} color={focused ? color : 'gray'} />
            );
          },
        }}
        component={OrdersScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
