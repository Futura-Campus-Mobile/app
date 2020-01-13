import React from 'react'

import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Device from '../../components/Device'
import Font from '../../components/Font'

import UserContext from '../../providers/User'

const styles = StyleSheet.create({
  SafeAreaView:{
    maxHeight: Dimensions.get('window').height - 115
  },
  container: {
    padding: 40
  },
  helloContainer: {
    marginBottom: 20
  },
  helloText: {
    fontSize: 40
  }
})

const VerTodosContainer = ({ text }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text>{text}</Text>
    <Text style={{ color: '#767676' }}>Ver todos <Icon name="chevron-right" /></Text>
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
              <Font name="open-sans-bold" style={styles.helloText}>
                Quanto vamos economizar hoje, {'\n'}{user.name}?
              </Font>
            </View>

            {(user.plugs.length === 0) &&
              <Text style={{ marginBottom: 20 }}>
                Você ainda não tem nenhum dispositivo adicionado.
                Adicione o primeiro para continuar
              </Text>}

            <View >
              <VerTodosContainer text="Seus dispositivos" />
              <View style={{flexDirection:"row",flexWrap:"wrap", justifyContent:"space-between"}}> 
                {user.devices.map(device => (<Device
                  key={device.id}
                  name={device.name}
                  onPress={() => navigation.navigate('DeviceInfo', { device })}
                />))}
              </View>
            </View>

            <View>
              <VerTodosContainer text="Seus Plugs" />
              {user.plugs.map(plug => (<Device
                key={plug.id}
                name={plug.model}
                onPress={() => navigation.navigate('PlugEdit', { plug })}
              />))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}