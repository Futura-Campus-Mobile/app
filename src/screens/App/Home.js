import React from 'react'

import Container from '../../components/Container'
import Label from '../../components/Label'

import { AsyncStorage, Button } from 'react-native'

import data from '../../data.json'

export default class Home extends React.Component {
  render() {
    const { navigation } = this.props
    const { labels } = data.user

    const _signOut = async () => {
      await AsyncStorage.clear()
      navigation.navigate('Auth')
    }

    return (
      <Container>
        <Button
          onPress={_signOut}
          title="Sign out"
        />
        {labels.map(label => (<Label
          key={label.id}
          name={label.name}
          onPress={() => navigation.navigate('LabelInfo', { label })}
        />))}
      </Container>
    );
  }
}