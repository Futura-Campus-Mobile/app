import React from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'

import * as ExpoFont from 'expo-font'

import WelcomeScreen from './src/screens/Welcome'
import SignInScreen from './src/screens/SignIn'
import HomeStack from './src/screens/Home'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { Provider as UserProvider } from "./src/providers/User"
import { Provider as EstimatesProvider } from './src/providers/Estimates'

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
      'opensans-bold': require('./assets/fonts/opensans/OpenSans-Bold.ttf'),
      'montserrat-bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
      'raleway-regular': require('./assets/fonts/raleway/Raleway-Regular.ttf'),
    })

    this.setState({ assetsLoaded: true })
  }

  render(){
    const { assetsLoaded } = this.state

    return assetsLoaded ? (
      <UserProvider>
        <EstimatesProvider>
          <AppContainer/>
        </EstimatesProvider>
      </UserProvider>
    ) : (
      <View>
        <ActivityIndicator/>
        <StatusBar/>
      </View>
    )
  }
}