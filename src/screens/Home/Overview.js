import React from 'react'

import { StyleSheet, View, Picker, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native'
import { PieChart } from "react-native-chart-kit";
import Device from '../../components/Device'
import Text, { normalizeFontSize } from '../../components/Text'

import { Context as UserContext } from '../../providers/User'

const styles = StyleSheet.create({
  SafeAreaView:{
    flex: 1,
    alignItems:"center",
    marginTop:StatusBar.currentHeight
  },
  dashboard:{
    minHeight:(Dimensions.get('window').height/2) - 140,
    width:"90%",
    maxWidth:"90%",
    flexDirection:"column",
    alignSelf:"center",
    justifyContent:'center'
  },
  dashboardTitle:{
    flexDirection:"row",
    alignSelf:"center",
    justifyContent:"space-between", 
    alignItems:"center",
    width:"100%",
  },
  resume:{
    alignItems:"flex-end"

  },
  devicesContainer:{
    backgroundColor:"#f4f5fa", 
    minHeight:(Dimensions.get('window').height * 0.555) , 
    borderTopEndRadius:25,
    borderTopStartRadius:25
  },
  devices:{
    flexDirection:"row", 
    width:'90%', 
    alignSelf:"center", 
    justifyContent:"space-between", 
    flexWrap:"wrap"
  }
})

export default class Overview extends React.Component {
  static navigationOptions = {
    title: 'Visão geral'
  }
  static contextType = UserContext

  render(){
    const { navigation } = this.props
    const user = this.context
    const { devices } = user
    const dataPieChart = [
      {
        name: "Ar condicionado",
        consumption: 21,
        color: "#F3A40C",
        legendFontColor: "#7F7F7F",
        legendFontSize: normalizeFontSize(17)
      },
      {
        name: "Microondas",
        consumption: 12,
        color: "#1AA5B8",
        legendFontColor: "#7F7F7F",
        legendFontSize: normalizeFontSize(17)
      },
      {
        name: "Forno Eletrico",
        consumption: 28.20,
        color: "#FF705E",
        legendFontColor: "#7F7F7F",
        legendFontSize: normalizeFontSize(17)
      },
      {
        name: "Geladeira",
        consumption: 8.20,
        color: "#b7b7b7",
        legendFontColor: "#7F7F7F",
        legendFontSize: normalizeFontSize(17)
      },
      {
        name: "Outros",
        consumption: 8.20,
        color: "#9510AC",
        legendFontColor: "#7F7F7F",
        legendFontSize: normalizeFontSize(17)
      }
  ]
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        { devices != "" ? (
        <ScrollView 
          style={{
            backgroundColor: "white",
            width:"100%",
          }}
        >
          <View style={{width:"100%", height:"100%",}}>
            <View style={styles.dashboard}>
              <View style={styles.dashboardTitle}>
                <Text.Title fontSize={19} style={{ fontWeight:"bold" }}>
                      R$ 1500,00
                </Text.Title>
                <Picker
                  selectedValue={"semana"}
                  style={{width:158, color:"black"}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({filter: itemValue})
                  }
                  mode="dropdown"
                  >
                  <Picker.Item label="Esta semana" value="semana" />
                  <Picker.Item label="Este mês" value="mes" />
                </Picker>
              </View>
              <View style={styles.resume}>
                <PieChart
                  data={dataPieChart}
                  width={Dimensions.get("screen").width}
                  height={Dimensions.get("screen").height/4}
                  chartConfig={{color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`}}
                  accessor="consumption"
                  backgroundColor="transparent"
                />
              </View>
            </View>
            <View style={styles.devicesContainer}>
              <Text.Title fontSize={20} style={{paddingTop:10, marginLeft:20, fontWeight:"700"}}>
                  Devices
              </Text.Title>
              <View style={styles.devices}> 
                {devices.map(device => (<Device
                  key={device.id}
                  name={device.name}
                  color={device.color}
                  fontSize={normalizeFontSize(17)}
                  onPress={() => navigation.navigate('DeviceInfo', { device })}
                />))}
              </View>
            </View>
          </View>
        </ScrollView>
        ) : <Text.Content>Nenhum dispositivo cadastrado</Text.Content>}
      </SafeAreaView>
    );
  }
}