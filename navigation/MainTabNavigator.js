import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MaterialCommunityIcons from '../components/MaterialCommunityIcons';
import SpeedCalcScreen from '../screens/SpeedCalcScreen';
import RangeCalcScreen from '../screens/RangeCalcScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: SpeedCalcScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Speed',
  tabBarOptions: { 
    activeTintColor: 'black',
    inactiveTintColor: '#ccc',
},
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      focused={focused}
      name={'speedometer'}
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: RangeCalcScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Range',
  tabBarOptions: { 
    activeTintColor: 'black',
    inactiveTintColor: '#ccc',
},
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      focused={focused}
      name={'fuel'}
    />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: { 
    activeTintColor: 'black',
    inactiveTintColor: '#ccc',
},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
