import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar, TouchableOpacity, Picker } from 'react-native';
import Text, {normalize} from '../../components/Text'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { PieChart } from "react-native-chart-kit";


export default class DeviceInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.device.name,
  })

  render(){
    const { navigation } = this.props
    const { device } = navigation.state.params

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height ,
        marginTop: StatusBar.currentHeight
      },
      deviceConsumptiomContainer:{
        backgroundColor:"#ffffff",
        height: (Dimensions.get('window').height * 0.62),
        width:Dimensions.get('window').width,
        padding:20        
      },
      spentContainer:{
        padding:20,
        flexDirection:'column',
        backgroundColor:"#f4f5fa",
        height: Dimensions.get('window').height*0.38,
        width:Dimensions.get('window').width,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        justifyContent:"center",
      },
      resume:{
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
      }

    })
    const dataPieChart = [
      {
        name: "R$ Forno eletrico",
        consumption: 21.40,
        color: "#F3A40C",
        legendFontColor: "black",
        legendFontSize: normalize(15)
      },
      {
        name: "Outros",
        consumption: 160,
        color: "#c4c4c4",
        legendFontColor: "black",
        legendFontSize: normalize(15)
      }
    ]


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.deviceConsumptiomContainer}>
        <TouchableOpacity style={{flexDirection:"row", alignSelf:'flex-start', marginBottom:10, alignItems:"center"}} onPress={()=>navigation.goBack()}> 
          <Icon solid size={13} name="arrow-left"/>
          <Text.Title fontSize={18} style={{marginLeft:5}}>voltar</Text.Title>
        </TouchableOpacity>
          <View style={{flexDirection:'row', height:"23%",  justifyContent:"space-between"}}>
            <View style={{flexDirection:'row', alignItems:'center', height:30, width:"60%", }}>
              <View style={{marginRight: 5, backgroundColor:"#F3A40C", borderRadius:999, height:10, width:10}} />
              <View style={{flexDirection:'column'}}>
                <Text.Header fontSize={17}>
                  Consumo Forno eletrico
                </Text.Header>
                <Text.Info fontSize={16}>
                  Adicionado em {new Date(device.createdAt).toLocaleDateString()}
                </Text.Info>
              </View>

            </View>
            <View style={{height:"100%", alignItems:"flex-end", justifyContent:"space-between"}}>
              <TouchableOpacity style={{flexDirection:"row", height: 30, width:80, borderRadius:5, backgroundColor:"#c4c4c4", alignItems:"center", justifyContent:'center'}}>
                  <Text.Header fontSize={16} style={{marginRight:5}}>editar</Text.Header>
                  <Icon solid size={10} name="edit"/>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:"row", height: 30, width:100, borderRadius:5, backgroundColor:"#38DFB7", alignItems:"center", justifyContent:'center'}}>
                  <Text.Header fontSize={16}>Ligar Aparelho</Text.Header>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{flexDirection:"row", marginBottom:-5}}>
              <Picker
                selectedValue="janeiro"
                style={{width:120,height:40, color:"black"}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({filter: itemValue})
                }
                mode="dropdown"
                >
                <Picker.Item label="Janeiro" value="janeiro" />
                <Picker.Item label="Fevereiro" value="fevereiro" />
              </Picker>
              <Picker
                selectedValue={2020}
                style={{width:100, height:40 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({filter: itemValue})
                }
                mode="dropdown"
                >
                <Picker.Item label="2020" value={2020} />
                <Picker.Item label="2019" value={2019} />
              </Picker>
            </View>
            <View style={styles.resume}>
              <PieChart
                data={dataPieChart}
                width={Dimensions.get("screen").height/4}
                height={Dimensions.get("screen").height/4}
                chartConfig={{color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`}}
                accessor="consumption"
                backgroundColor="transparent"
                absolute
                paddingLeft={40}
                hasLegend={false}
              />
              <View style={{flexDirection:"row", width:"80%", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row", height: 30, width:"50%", borderRadius:5, alignItems:"center", justifyContent:'center'}}>
                  <View style={{marginRight: 5, backgroundColor:"#F3A40C", borderRadius:999, height:13, width:13}} />
                  <View style={{flexDirection:'column'}}>
                    <Text.Header fontSize={17}>
                      Forno eletrico
                    </Text.Header>
                    <Text.Content fontSize={17}>
                      R$ 21,40
                    </Text.Content>
                  </View>
                </View>
                <View style={{flexDirection:"row", height: 30, width:"50%", borderRadius:5, alignItems:"center", justifyContent:'center'}}>
                  <View style={{marginRight: 5, backgroundColor:"#c4c4c4", borderRadius:999, height:13, width:13}} />
                  <View style={{flexDirection:'column'}}>
                    <Text.Header fontSize={17}>
                      Outros
                    </Text.Header>
                    <Text.Content fontSize={17}>
                      R$ 160,00
                    </Text.Content>
                  </View>
                </View>
              </View>
            </ View>
          </View>
        </View>
        <View style={styles.spentContainer}>
          <View style={{ height: 80}}>
              <Text.Header>
                Horas ligado
              </Text.Header>
              <View style={{flexDirection:'row', alignItems:"center", paddingTop:5}}>
                <View style={{backgroundColor:"#c4c4c4", height:35, width:"87%", borderRadius:10}}>
                  <View style={{ backgroundColor:"#F3A40C", height:35, width:90, borderRadius:10 }} />
                </View>
                <Text.Header> 21,40 </Text.Header>
              </View>
          </View>
          <View style={{ height: 80}}>
              <Text.Header>
                Valor gasto por hora
              </Text.Header>
              <View style={{flexDirection:'row', alignItems:"center", paddingTop:5}}>
                <View style={{backgroundColor:"#c4c4c4", height:35, width:"87%", borderRadius:10}}>
                  <View style={{ backgroundColor:"#F3A40C", height:35, width:120, borderRadius:10 }} />
                </View>
                <Text.Header> 160 </Text.Header>
              </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


