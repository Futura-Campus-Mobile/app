import React from 'react'

import WelcomeScreen from './src/screens/Welcome'
import SignInScreen from './src/screens/SignIn'
import HomeStack from './src/screens/Home'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { UserProvider } from "./src/providers/User"

const RootNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    Home: HomeStack,
  },
  {
    initialRouteName: 'Welcome',
  }
)

const AppContainer = createAppContainer(RootNavigator)

export default () => (
  <UserProvider>
    <AppContainer />
  </UserProvider>
)