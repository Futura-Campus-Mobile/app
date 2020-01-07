import React from 'react'

import HomeScreen from './src/screens/App/Home'
import LabelInfoScreen from './src/screens/App/LabelInfo'
import AuthLoadingScreen from './src/screens/Auth/AuthLoading'
import SignInScreen from './src/screens/Auth/SignIn'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const AppStack = createStackNavigator({ Home: HomeScreen, LabelInfo: LabelInfoScreen })
const AuthStack = createStackNavigator({ SignIn: SignInScreen })

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack, App: AppStack
  },
  { initialRouteName: 'AuthLoading' }
)

export default createAppContainer(RootStack)