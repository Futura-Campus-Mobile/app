import React from 'react'

import { SafeAreaView } from 'react-native'

import Text from '../../components/Text'
import Card from '../../components/Card'
import Header from '../../components/Header'

import { Context as UserContext } from '../../providers/User'

export default class Profile extends React.Component {
  static contextType = UserContext

  render() {
    const { navigation } = this.props
    const user = this.context

    return (
      <SafeAreaView>
        <Header title="Perfil" />
        <Card>
          <Text.Info><Text.Content>Nome:</Text.Content> {user.name}</Text.Info>
          <Text.Info><Text.Content>E-mail:</Text.Content> {user.email}</Text.Info>
        </Card>
      </SafeAreaView>
    );
  }

}