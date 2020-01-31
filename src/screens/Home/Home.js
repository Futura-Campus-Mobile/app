import React from 'react'

import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Switch } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Device from '../../components/Device'
import Card from '../../components/Card'
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

const Room = ({ name, activeDevices }) => (
  <Card style={{
    marginHorizontal: 5,
    marginVertical: 5,
    width: 130,
    padding: 20,
    flexDirection: 'column'
  }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      }}
    >
      <Icon name="hotel" size={20} />
      <Switch style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
    </View>


    <Text.Title>{name}</Text.Title>
    <Text.Info fontSize={10} color='green'>{activeDevices} dispositivo(s) ativos</Text.Info>
  </Card>
)

export default class Home extends React.Component {
  static contextType = UserContext

  state = {
    scrollEnabled: true,
    deviceFilter: 'devices',
    setDeviceFilter: filter => this.setState({ deviceFilter: filter }),
    setScrollEnabled: scrollEnabled => this.setState({ scrollEnabled })
  }

  render() {
    const { navigation } = this.props
    const { scrollEnabled, setScrollEnabled, deviceFilter, setDeviceFilter } = this.state
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

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: "100%",
                paddingHorizontal: 70,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity onPress={() => setDeviceFilter('devices')}>
                <Text.Content style={{ color: deviceFilter == 'devices' ? '#000' : '#c5c5c5' }}>
                  Dispositivos
                </Text.Content>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeviceFilter('home')}>
                <Text.Content style={{ color: deviceFilter == 'home' ? '#000' : '#c5c5c5' }}>
                  Casa
                </Text.Content>
              </TouchableOpacity>
            </View>

            {(user.plugs.length === 0) && (
              <Text.Info color='#c5c5c5' style={{ marginBottom: 20 }}>
                Adquira Plugs para ter ainda mais economia e conforto
              </Text.Info>
            )}

            {(deviceFilter == 'home') ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {user.getDevicesByRoom().map((room, index) => (
                  <Room key={index} name={room.name} activeDevices={room.devices.filter(device => device.isOn).length} />
                ))}
              </View>
            ) : (
                <Draggable>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
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
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>

                    {(user.devices.length === 0) && (
                      <Text.Content style={{ marginBottom: 20 }}>
                        Você ainda não tem nenhum dispositivo adicionado.
                        Adicione o primeiro para continuar
                      </Text.Content>
                    )}

                    {user.devices.map(device => (
                      <Draggable.Dropdown name={device.id} key={device.id} style={{ width: "50%", flexDirection: 'row' }}>
                        <Device
                          name={device.name}
                          icon={device.icon}
                          room={device.room}
                          isOn={device.isOn}
                          connectedTo={user.deviceIsConnected(device.id)}
                          onPress={() => navigation.navigate('DeviceInfo', { device })}
                        />
                      </Draggable.Dropdown>
                    ))}
                  </View>
                </Draggable>
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}