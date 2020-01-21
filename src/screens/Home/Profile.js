import React from 'react'

import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'

import { Context as UserContext } from '../../providers/User'

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Perfil'
  }
  static contextType = UserContext

  render() {
    const { navigation } = this.props
    const user = this.context

    return (
      <SafeAreaView>
        <View>
          <Text>Nome: {user.name}</Text>
          <Text>E-mail: {user.email}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyHome')}>
            <Text>Minha casa</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

}