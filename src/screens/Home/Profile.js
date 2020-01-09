import React from 'react'

import { Text, View } from 'react-native'

import UserContext from '../../providers/User'

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Perfil'
  }
  static contextType = UserContext

  render(){
    const { navigation } = this.props
    const user = this.context

    return (
      <View>
        <Text>Nome: {user.name}</Text>
        <Text>E-mail: {user.email}</Text>
      </View>
    );
  }

}