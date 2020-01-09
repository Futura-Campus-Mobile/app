import React from 'react'

import { Text, View } from 'react-native'

import UserContext from '../../providers/User'

export default class Overview extends React.Component {
  static navigationOptions = {
    title: 'Visão geral'
  }
  static contextType = UserContext

  render(){
    const { navigation } = this.props
    const user = this.context

    return (
      <View>
        <Text>Gastos do {user.name}</Text>
      </View>
    );
  }

}