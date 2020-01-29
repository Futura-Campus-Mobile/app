import React from 'react'

import HomeScreen from './Home'
import MyHomeScreen from './MyHome'
import SettingsScreen from './Settings'
import OverviewScreen from './Overview'
import DeviceInfoScreen from './DeviceInfo'
import DeviceEditScreen from './DeviceEdit'
import PlugEditScreen from './PlugEdit'

import TabBar from '../../components/TabBar'

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

const HomeTab = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
    Overview: OverviewScreen
  }, 
  {
    initialRouteName: 'Home',
    tabBarComponent: props => <TabBar {...props}/>,
  }
)

export default createStackNavigator(
  {
    Home: HomeTab,
    MyHome: MyHomeScreen,
    DeviceInfo: DeviceInfoScreen,
    PlugEdit: PlugEditScreen,
    DeviceEdit: DeviceEditScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
)

