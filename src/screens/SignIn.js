import React from 'react'

import { Button, View, StatusBar } from 'react-native'

import { Context as UserContext } from '../providers/User'

export default class SignIn extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <UserContext.Consumer>
          {({ devices }) => {
            const userHaveDevices = devices.length !== 0

            return (
              <Button title="Entrar" onPress={
                () => navigation.navigate(userHaveDevices ? 'Home' : 'MyHome')
              } />
            )
          }}
          
        </UserContext.Consumer>
      </View>
    );
  }
}