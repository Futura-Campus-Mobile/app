import React from 'react'

import { Button, View, StatusBar } from 'react-native'

export default class SignIn extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <Button title="Entrar" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}