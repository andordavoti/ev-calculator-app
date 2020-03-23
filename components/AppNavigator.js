import React from 'react'
import { StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { connect } from 'react-redux'

import { setCurrentTheme } from '../redux/settings/settings.action'

import SpeedScreen from '../screens/SpeedScreen'
import RangeScreen from '../screens/RangeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import TabBarIcon from './TabBarIcon'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

SpeedScreen.navigationOptions = {
    title: 'Speed',
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
    }
}

RangeScreen.navigationOptions = {
    title: 'Range',
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
    }
}

const SpeedScreenStack = createStackNavigator({ SpeedScreen }),
    RangeScreenStack = createStackNavigator({ RangeScreen }),
    SettingsScreenStack = createStackNavigator({ SettingsScreen }),
    Tabs = createBottomTabNavigator({ SpeedScreenStack, RangeScreenStack, SettingsScreenStack }),
    Navigation = createAppContainer(Tabs)

const AppNavigator = ({ theme, setCurrentTheme }) => {

    setCurrentTheme(useColorScheme())

    SpeedScreenStack.navigationOptions = {
        tabBarLabel: 'Speed',
        tabBarOptions: {
            activeTintColor: theme === 'dark' ? 'white' : 'black',
            inactiveTintColor: theme === 'dark' ? 'gray' : '#ccc',
        },
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='speedometer' />,
    }

    RangeScreenStack.navigationOptions = {
        tabBarLabel: 'Range',
        tabBarOptions: {
            activeTintColor: theme === 'dark' ? 'white' : 'black',
            inactiveTintColor: theme === 'dark' ? 'gray' : '#ccc',
        },
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='fuel' />,
    }

    SettingsScreenStack.navigationOptions = {
        tabBarLabel: 'Settings',
        tabBarOptions: {
            activeTintColor: theme === 'dark' ? 'white' : 'black',
            inactiveTintColor: theme === 'dark' ? 'gray' : '#ccc',
        },
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='settings' />,
    }
    return <AppearanceProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />}
        <Navigation theme={theme} />
    </AppearanceProvider>
}

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
})

const mapDispatchToProps = dispatch => ({
    setCurrentTheme: theme => dispatch(setCurrentTheme(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)