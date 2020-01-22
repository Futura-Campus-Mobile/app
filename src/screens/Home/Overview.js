import React from 'react'

import { StyleSheet, Text, View, Picker, SafeAreaView, ScrollView, Dimensions } from 'react-native'

import PieChart from '../../components/PieChart'
import Device from '../../components/Device'
import Circle from '../../components/Circle'

import { Context as UserContext } from '../../providers/User'

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    width: "100%",
    maxHeight: Dimensions.get('window').height - 90,
  },
  dashboard: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    height: "8%",
    alignItems: "center"
  },
  resume: {
    marginTop: 10,
    flexDirection: "row",
    width: "90%",
    maxWidth: "90%",
    height: 160,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  devicesContainer: {
    marginTop: 10,
    backgroundColor: "#f4f5fa",
    height: "100%",
    borderRadius: 25
  },
  devices: {
    flexDirection: "row",
    width: '90%',
    alignSelf: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
})

export default class Overview extends React.Component {
  static navigationOptions = {
    title: 'Visão geral'
  }
  static contextType = UserContext

  render() {
    const { navigation } = this.props
    const user = this.context
    const { devices } = user

    return (
      <SafeAreaView style={styles.SafeAreaView}>

        {devices != "" ? (
          <ScrollView
            style={{
              backgroundColor: "white",
              width: "100%",
            }}

          >
            <View style={{ width: "100%", height: "100%", }}>
              <View style={styles.dashboard}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Dashboard
                </Text>
                <Picker
                  selectedValue={"semana"}
                  style={{ width: 158, color: "black" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ filter: itemValue })
                  }
                  mode="dropdown"
                >
                  <Picker.Item label="Esta semana" value="semana" />
                  <Picker.Item label="Este mês" value="mes" />
                </Picker>
              </View>
              <View style={styles.resume}>
                <PieChart devices={devices} />
                <View style={{ flexDirection: "column", width: 140, height: 150, justifyContent: "center" }}>
                  {devices.map((label) => (
                    <View key={label.id} style={{ flexDirection: "row", height: 40, width: 110, marginBottom: 5, alignItems: 'center' }}>
                      <Circle fill={label.color} style={{ marginRight: 10 }}/>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "black", fontSize: 16, fontWeight: "700" }}>
                          48%
                      </Text>
                        <Text style={{ color: "grey" }}>
                          {label.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.devicesContainer}>
                <Text style={{ paddingTop: 10, fontSize: 17, marginLeft: 20, fontWeight: "700" }}>
                  Devices
              </Text>
                <View style={styles.devices}>
                  {devices.map(device => (<Device
                    key={device.id}
                    name={device.name}
                    color={device.color}
                    onPress={() => navigation.navigate('DeviceInfo', { device })}
                  />))}
                </View>
              </View>
            </View>
          </ScrollView>

        ) : <Text>Nenhum dispositivo cadastrado</Text>}
      </SafeAreaView>
    );
  }
}