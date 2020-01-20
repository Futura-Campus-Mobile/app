import React from 'react'

import HomeScreen from './Home'
import MyHomeScreen from './MyHome'
import ProfileScreen from './Profile'
import OverviewScreen from './Overview'
import DeviceInfoScreen from './DeviceInfo'
import DeviceEditScreen from './DeviceEdit'
import PlugEditScreen from './PlugEdit'

import TabBar from '../../components/TabBar'
import StackNavigatorHeader from '../../components/StackNavigationHeader'

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

const HomeTab = createBottomTabNavigator(
  {
    Home: HomeScreen,
    MyHome: MyHomeScreen,
    Profile: ProfileScreen,
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
    DeviceInfo: DeviceInfoScreen,
    PlugEdit: PlugEditScreen,
    DeviceEdit: DeviceEditScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: props => <StackNavigatorHeader {...props}/>,
    }
  }
)