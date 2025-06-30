// screens/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import QuotationScreen from './QuotationScreen';
import UpcomingScreen from './UpcomingScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Quotations') iconName = 'file-text-o';
          else if (route.name === 'Upcoming') iconName = 'calendar';
          else if (route.name === 'My Account') iconName = 'user';
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0096FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Quotations" component={QuotationScreen} />
      <Tab.Screen name="Upcoming" component={UpcomingScreen} />
      <Tab.Screen name="My Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
