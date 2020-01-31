import React from 'react'
import moment from 'moment'
import { StyleSheet, View, Picker, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { PieChart } from "react-native-chart-kit";
import Device from '../../components/Device'
import Text, { normalizeFontSize } from '../../components/Text'
import { Context as UserContext } from '../../providers/User'
import Icon from 'react-native-vector-icons/FontAwesome5'


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: normalizeFontSize(17),
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop:5,
    color: 'black',
    paddingLeft: 5,
    paddingRight: 30
  },
  inputAndroid: {
    fontSize: normalizeFontSize(17),
    paddingVertical: 2,
    color: 'black',
    marginTop:5,
    paddingLeft: 5,
    paddingRight: 30
  },
});
const styles = StyleSheet.create({
  SafeAreaView:{
    flex: 1,
    alignItems:"center",
    width:Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height - 50,
    paddingTop:StatusBar.currentHeight
  },
  dashboard:{
    minHeight:(Dimensions.get('window').height) * 0.3,
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
  devicesContainer:{
    flex:1,
    backgroundColor:"#f4f5fa", 
    minHeight:(Dimensions.get('window').height) * 0.575, 
    borderTopEndRadius:25,
    borderTopStartRadius:25,
    paddingHorizontal:30
  },
  devices:{
    flexDirection:"row", 
    alignSelf:"center", 
    justifyContent:"space-between", 
    flexWrap:"wrap"
  }
})

export default class Overview extends React.Component {
  static contextType = UserContext

  constructor(props){
    super(props);
    this.state = {
      devices: [],
      monthlyConsumption:"",
      weeklyConsumption:"",
      selectedValue:"weeklyConsumption",
    }
  }
  dateDeviceConsumption = (date, consumption) =>{
    const dateStart = moment().startOf(date)
    return consumption.reduce( (deviceSum, { time, kw }) => {
    const { start, end } = time
      if(dateStart.isBefore(end)){
          const startTime = dateStart.isAfter(start) ? dateStart : start
          const elapsedTime = moment.duration(end - startTime).asHours()
          return deviceSum + (elapsedTime*kw)
      }else{
        return deviceSum
      }
    }, 0)
  }
  componentDidMount = async () => {
    const user = this.context
    let { devices } = user
    const newDevices = devices.map((item) => {
      const {consumption} = item
      weeklyDeviceConsumption = this.dateDeviceConsumption("week", consumption)
      monthlyDeviceConsumption = this.dateDeviceConsumption("month", consumption)
      return (
        { 
          name: item.name, 
          id:item.id, 
          color:item.color, 
          weeklyConsumption: weeklyDeviceConsumption, 
          monthlyConsumption:monthlyDeviceConsumption, 
          legendFontColor: "#7F7F7F", 
          legendFontSize: normalizeFontSize(17),
          room:item.room,
          icon:item.icon
        }
        )
    }) 
    const weeklyConsumption = newDevices.reduce((soma, {weeklyConsumption}) => {
      soma += weeklyConsumption
      return soma
    },0)
    const monthlyConsumption = newDevices.reduce((soma, {monthlyConsumption}) => {
      soma += monthlyConsumption
      return soma
    },0)
    this.setState({devices : newDevices})
    this.setState({monthlyConsumption : monthlyConsumption})
    this.setState({weeklyConsumption : weeklyConsumption})
  }

  static navigationOptions = {
    title: 'Visão geral'
  }
  static contextType = UserContext

  render(){
    const { navigation } = this.props
    const user = this.context
    let { devices } = user
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        { devices != "" ? (
        <ScrollView style={{ backgroundColor: "white", width:"100%" }}>
          <View style={{width:"100%", height:"100%",}}>
            <View style={styles.dashboard}>
              <View style={styles.dashboardTitle}>
                <Text.Title fontSize={19} style={{ fontWeight:"bold" }}>
                      R$ {this.state.selectedValue === "weeklyConsumption" ? this.state.weeklyConsumption : this.state.monthlyConsumption}
                </Text.Title>
                <View style={{ flexDirection: "row", width:110 }}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => this.setState({ selectedValue: value })}
                    items={[
                        { label: 'Esta semana', value: 'weeklyConsumption' },
                        { label: 'Este mês', value: 'monthlyConsumption' }
                    ]}
                    value={this.state.selectedValue}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 12,
                        right: 12,
                      },
                    }}
                    Icon={() => <Icon solid size={13} name="sort-down" />}
                  />
                </View>
              </View>
              <View style={{alignItems:"flex-end"}}>
                <PieChart
                  data={this.state.devices}
                  width={Dimensions.get("screen").width}
                  height={Dimensions.get("screen").height/4}
                  chartConfig={{color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`}}
                  accessor={this.state.selectedValue}
                  backgroundColor="transparent"
                />
              </View>
            </View>
            <View style={styles.devicesContainer}>
              <Text.Title fontSize={20} style={{paddingTop:20, fontWeight:"700"}}>
                  Devices
              </Text.Title>
              <View style={styles.devices}> 
                {devices.map(device => (<Device
                  key={device.id}
                  name={device.name}
                  color={device.color}
                  room={device.room}
                  icon={device.icon}
                  fontSize={normalizeFontSize(17)}
                  id={device.id}
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