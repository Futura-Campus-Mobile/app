import React from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'

import * as ExpoFont from 'expo-font'

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

export default class App extends React.Component {
  state = {
    assetsLoaded: false
  }

  async componentDidMount(){
    await ExpoFont.loadAsync({
      'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
    })

    this.setState({ assetsLoaded: true })
  }

  render(){
    const { assetsLoaded } = this.state

    return assetsLoaded ? (
      <UserProvider>
        <AppContainer />
      </UserProvider>
    ) : (
      <View>
        <ActivityIndicator/>
        <StatusBar/>
      </View>
    )
  }
}