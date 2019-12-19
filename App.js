import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import SpeedScreen from './screens/SpeedScreen';
import RangeScreen from './screens/RangeScreen';
import SettingsScreen from './screens/SettingsScreen';
import TabBarIcon from './components/TabBarIcon';

SpeedScreen.navigationOptions = {
  title: 'Speed',
  headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
  },
};

RangeScreen.navigationOptions = {
  title: 'Range',
  headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
  },
};

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
  },
};

let SpeedScreenStack = createStackNavigator({ SpeedScreen });
let RangeScreenStack = createStackNavigator({ RangeScreen });
let SettingsScreenStack = createStackNavigator({ SettingsScreen });

let Tabs = createBottomTabNavigator({ SpeedScreenStack, RangeScreenStack, SettingsScreenStack });
let Navigation = createAppContainer(Tabs);

export default App = () => {
    let theme = useColorScheme();

    SpeedScreenStack.navigationOptions = {
      tabBarLabel: 'Speed',
      tabBarOptions: {
        activeTintColor: theme === 'dark' ? 'white' : 'black',
        inactiveTintColor: theme === 'dark' ? 'gray' : '#ccc',
      },
      tabBarIcon: ({ focused }) => (
        <TabBarIcon theme={theme} focused={focused} name='speedometer' />
      ),
    };

    RangeScreenStack.navigationOptions = {
      tabBarLabel: 'Range',
      tabBarOptions: {
        activeTintColor: theme === 'dark' ? 'white' : 'black',
        inactiveTintColor: theme === 'dark' ? 'gray' : '#ccc',
      },
      tabBarIcon: ({ focused }) => (
        <TabBarIcon theme={theme} focused={focused} name='fuel' />
      ),
    };

    SettingsScreenStack.navigationOptions = {
      tabBarLabel: 'Settings',
      tabBarOptions: {
        activeTintColor: theme === 'dark' ? 'white' : 'black',
        inactiveTintColor: theme === 'dark' ? 'gray' : '#ccc',
      },
      tabBarIcon: ({ focused }) => (
        <TabBarIcon theme={theme} focused={focused} name='settings' />
      ),
    };
    return (
      <AppearanceProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />}
        <Navigation theme={theme} screenProps={theme} />
      </AppearanceProvider>
    );
  }
