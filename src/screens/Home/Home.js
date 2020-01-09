import React from 'react'

import Container from '../../components/Container'
import Device from '../../components/Device'

import { Button, Text } from 'react-native'

import UserContext from '../../providers/User'

export default class Home extends React.Component {
  static contextType = UserContext
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Profile')}
        title="Perfil"
      />
    )
  })

  render() {
    const { navigation } = this.props
    const user = this.context

    return (
      <Container>
        <Text>Olá, {user.name}</Text>
        {(user.plugs.length === 0) && <Text>Você ainda não tem nenhum dispositivo adicionado. Adicione o primeiro para continuar</Text>}
        {user.devices.map(device => (<Device
          key={device.id}
          name={device.name}
          onPress={() => navigation.navigate('DeviceInfo', { device })}
        />))}
        <Button
          onPress={() => navigation.navigate('Overview')}
          title="Overview"
        />
        <Button
          disabled={user.plugs.length === 0}
          onPress={() => navigation.navigate('DeviceEdit')}
          title="New Device"
        />
        <Button
          onPress={() => navigation.navigate('PlugEdit')}
          title="New Plug"
        />
      </Container>
    );
  }
}