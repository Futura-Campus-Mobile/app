import React from 'react'

import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Device from '../../components/Device'
import Text from '../../components/Text'
import Draggable from '../../components/Draggable'

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
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, width: "100%" }}>
    <Text.Content>{text}</Text.Content>
    <Text.Content style={{ color: '#767676' }}>Ver todos <Icon name="chevron-right" /></Text.Content>
  </View>
)

const Plug = ({ model, connected, onPress }) => (
  <View style={{
    flexDirection: 'row',
    borderRadius: 100,
    backgroundColor: connected ? 'gray' : 'red',
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15
  }}

  >
    {connected ? (
      <TouchableOpacity onPress={onPress}>
        <Text.Info>{model}</Text.Info>
      </TouchableOpacity>
    ) : (
      <Text.Info>{model}</Text.Info>
    )}
  </View>
)

export default class Home extends React.Component {
  static contextType = UserContext

  state = {
    scrollEnabled: true,
    setScrollEnabled: scrollEnabled => this.setState({ scrollEnabled })
  }

  render() {
    const { navigation } = this.props
    const { scrollEnabled, setScrollEnabled } = this.state
    const user = this.context

    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <View style={styles.container}>
            <View style={styles.helloContainer}>
              <Text.Header style={styles.helloText}>
                Quanto vamos economizar hoje, {'\n'}{user.name}?
              </Text.Header>
            </View>

            <Draggable>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {(user.plugs.length === 0) ?
                  <Text.Content style={{ marginBottom: 20 }}>
                    Você ainda não possui nenhum Plug. Adicione Plugs para ter ainda mais economia e conforto
                  </Text.Content> : <VerTodosContainer text="Seus Plugs" />}

                {user.plugs.map(plug => (
                  <Draggable.View
                    key={plug.id}
                    disabled={user.plugIsConnected(plug.id)}
                    onDragStart={() => setScrollEnabled(false)}
                    onDragEnd={dropdownName => {
                      setScrollEnabled(true)
                      user.connectPlug(plug.id, dropdownName)
                    }}
                  >
                    <Plug
                      model={plug.model}
                      connected={user.plugIsConnected(plug.id)}
                      onPress={() => {
                        user.connectPlug(plug.id, undefined)
                        // navigation.navigate('PlugEdit', { plug })
                      }}
                    />
                  </Draggable.View>
                ))}

                {(user.devices.length === 0) ?
                  <Text.Content style={{ marginBottom: 20 }}>
                    Você ainda não tem nenhum dispositivo adicionado.
                    Adicione o primeiro para continuar
                </Text.Content> : <VerTodosContainer text="Seus dispositivos" />}
                {user.devices.map(device => (
                  <Draggable.Dropdown name={device.id} key={device.id} style={{ width: "50%", flexDirection: 'row' }}>
                    <Device
                      name={device.name}
                      icon={device.icon}
                      room={device.room}
                      connectedTo={user.deviceIsConnected(device.id)}
                      onPress={() => navigation.navigate('DeviceInfo', { device })}
                    />
                  </Draggable.Dropdown>
                ))}
              </View>
            </Draggable>


          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}