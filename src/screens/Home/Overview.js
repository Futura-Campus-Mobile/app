import React from 'react'

import { StyleSheet, Text, View, Picker, SafeAreaView } from 'react-native'
import PieChart from '../../components/PieChart'
import Device from '../../components/Device'
import Svg, { Circle } from 'react-native-svg';

import UserContext from '../../providers/User'
import { ScrollView } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  SafeAreaView:{
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems:"center",
    width:"100%",
    height:"100%"
  },
  dashboard:{
    flexDirection:"row",
    alignSelf:"center",
    justifyContent:"space-between", 
    width:"90%", 
    height:"8%", 
    alignItems:"center"
  },
  resume:{
    marginTop:10,
    flexDirection:"row",
    width:"90%",
    maxWidth:"90%",
    height:160,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"space-between"
  },
  devicesContainer:{
    marginTop:10,
    backgroundColor:"#f4f5fa", 
    height:"100%", 
    borderRadius:25
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
    const labels = devices
    return (
      <ScrollView 
        style={{
          backgroundColor: "#f4f5fa"
        }}
      >
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={{width:"100%", height:"100%",}}>
            <View style={styles.dashboard}>
              <Text style={{ fontWeight:"bold", fontSize:17 }}>
                  Dashboard
              </Text>
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
            <PieChart devices = {labels}/>
            <View style={{flexDirection:"column", width:140, height:150, justifyContent:"center"}}>
              {labels.map((label)=>(
                <View key = {label.id} style={{flexDirection:"row", height:40, width:110, marginBottom:5}}>
                  <Svg height="50%" width="20%">
                    <Circle cx="10" cy="11" r="6" strokeWidth="1" fill={label.color} />
                  </Svg>
                  <View style={{flexDirection:"column"}}>
                    <Text style={{color:"black", fontSize:16, fontWeight:"700"}}>
                      48% 
                    </Text>
                    <Text style={{color:"grey"}}>
                      {label.name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.devicesContainer}>
            <Text style={{paddingTop:10, fontSize:17,marginLeft:20, fontWeight:"700"}}>
                Devices
            </Text>
            <View style={styles.devices}> 
              {labels.map(device => (<Device
                key={device.id}
                name={device.name}
                color={device.color}
                onPress={() => navigation.navigate('DeviceInfo', { device })}
              />))}
            </View>
          </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}