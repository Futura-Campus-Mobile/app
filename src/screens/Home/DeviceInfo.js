import React from 'react'
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar, TouchableOpacity, Picker, ScrollView } from 'react-native'
import Text, { normalizeFontSize } from '../../components/Text'
import RNPickerSelect from 'react-native-picker-select'
import Circle from '../../components/Circle'
import DeviceConsumption from '../../components/DeviceConsumption'
import Icon from 'react-native-vector-icons/FontAwesome5'
import PieChart from '../../components/PieChart'
import moment from 'moment'
const { width: WIDTH } = Dimensions.get('window')

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: normalizeFontSize(17),
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor:"#c4c4c4"
  },
  inputAndroid: {
    fontSize: normalizeFontSize(17),
    paddingVertical: 2,
    backgroundColor:"#c4c4c4",
    borderRadius: 5,
    color: 'black',
    paddingLeft: 5,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: WIDTH,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight
  },
  deviceConsumptiomContainer: {
    flex:1,
    backgroundColor: "#ffffff",
    width: '100%',
    padding: 20
  },
  spentContainer: {
    flex:1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: "#f4f5fa",
    width: WIDTH,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  }
})
const SpendBar = ({text, value, ...style}) => (
  <View {...style}>
    <Text.Title>
      {text}
    </Text.Title>
    <View style={{ flexDirection: 'row', alignItems: "center", paddingTop: 5 }}>
      <View style={{ backgroundColor: "#c4c4c4", height: 35, width: "87%", borderRadius: 10 }}>
        <View style={{ backgroundColor: "#F3A40C", height: 35, width: 90, borderRadius: 10 }} />
      </View>
      <Text.Content>{value}</Text.Content>
    </View>
  </View>
)

export default class DeviceInfo extends React.Component {
  constructor(props){
    super(props);
    const { navigation } = props
    const { device } = navigation.state.params
    this.state = {
      device:device,
      monthlyConsumption:0,
      weeklyConsumption:0,
      selectedValue:"weeklyConsumption",
    }
  }
  dateDeviceConsumption = (date) =>{
    const dateStart = moment().startOf(date)
    return this.state.device.consumption.reduce( (deviceSum, { time, kw }) => {
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
  componentDidMount = () => {
    const weeklyDeviceConsumption = this.dateDeviceConsumption("week")
    const monthlyDeviceConsumption = this.dateDeviceConsumption("month")
    this.setState({monthlyConsumption : monthlyDeviceConsumption})
    this.setState({weeklyConsumption : weeklyDeviceConsumption})
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{flex:1}}>
          <View style={styles.deviceConsumptiomContainer}>
            <TouchableOpacity style={{ flexDirection: "row", alignSelf: 'flex-start', marginBottom: 10, alignItems: "center" }} onPress={() => this.props.navigation.goBack()}>
              <Icon solid size={13} name="arrow-left" />
              <Text.Title fontSize={18} style={{ marginLeft: 5 }}>voltar</Text.Title>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', height: 75, justifyContent: "space-between" }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, width: "60%", }}>
                <Circle radius={5} fill='#F3A40C' style={{ marginRight: 5 }} />
                <View style={{ flexDirection: 'column' }}>
                  <Text.Header fontSize={17}>
                    Consumo {this.state.device.name}
                </Text.Header>
                  <Text.Info fontSize={16}>
                    Adicionado em {new Date(this.state.device.createdAt).toLocaleDateString()}
                  </Text.Info>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
                <TouchableOpacity style={{ flexDirection: "row", padding: 10, width: 80, borderRadius: 5, backgroundColor: "#c4c4c4", alignItems: "center", justifyContent: 'center' }}>
                  <Text.Title fontSize={16} style={{ marginRight: 5 }}>Editar</Text.Title>
                  <Icon solid size={10} name="edit" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", padding: 10, borderRadius: 5, backgroundColor: "#38DFB7", alignItems: "center", justifyContent: 'center' }}>
                  <Text.Title fontSize={16}>Ligar Aparelho</Text.Title>
                </TouchableOpacity>
              </View>
            </View>
            <View>
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
                      top: 7,
                      right: 12,
                    },
                  }}
                  Icon={() => <Icon solid size={13} name="sort-down" />}
                />
              </View>
              <DeviceConsumption />
            </View>
          </View>
          <View style={styles.spentContainer}>
            <PieChart data={this.state.device} selectedValue={this.state.selectedValue} monthlyConsumption={this.state.monthlyConsumption} weeklyConsumption={this.state.weeklyConsumption} />
            <SpendBar text = "Horas ligado" value ="16" style={{ marginBottom: 20 }}/>
            <SpendBar text = "Valor gasto por hora" value ={this.state.weeklyConsumption} style={{ marginBottom: 20 }}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}