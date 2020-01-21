import React from 'react'

import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Device from '../../components/Device'
import Text from '../../components/Text'

import { Context as UserContext } from '../../providers/User'

const styles = StyleSheet.create({
  SafeAreaView: {
    maxHeight: Dimensions.get('window').height - 90
  },
  container: {
    padding: 40
  },
  helloContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  helloText: {
    fontSize: 30
  }
})

const VerTodosContainer = ({ text }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
    <Text.Content>{text}</Text.Content>
    <Text.Content style={{ color: '#767676' }}>Ver todos <Icon name="chevron-right" /></Text.Content>
  </View>
)

export default class Home extends React.Component {
  static contextType = UserContext

  render() {
    const { navigation } = this.props
    const user = this.context

    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.helloContainer}>
              <Text.Header style={styles.helloText}>
                Quanto vamos economizar hoje, {'\n'}{user.name}?
              </Text.Header>
            </View>

            {(user.plugs.length === 0) ?
              <Text.Content style={{ marginBottom: 20 }}>
                Você ainda não possui nenhum Plug. Adicione Plugs para ter ainda mais economia e conforto
              </Text.Content> : <View>
              <VerTodosContainer text="Seus Plugs" />
              {user.plugs.map(plug => (<Device
                key={plug.id}
                name={plug.model}
                onPress={() => navigation.navigate('PlugEdit', { plug })}
              />))}
            </View>}

            {(user.devices.length === 0) ?
              <Text.Content style={{ marginBottom: 20 }}>
                Você ainda não tem nenhum dispositivo adicionado.
                Adicione o primeiro para continuar
                </Text.Content> :
              <View>
                <VerTodosContainer text="Seus dispositivos" />
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                  {user.devices.map(device => (<Device
                    key={device.id}
                    name={device.name}
                    onLongPress={() => navigation.navigate('DeviceInfo', { device })}
                  />))}
                </View>
              </View>
            }


          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}