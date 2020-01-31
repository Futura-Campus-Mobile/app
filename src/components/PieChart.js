import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { PieChart } from "react-native-chart-kit"
import Text, { normalizeFontSize } from './Text'
import Circle from './Circle'


export default class PieChartDeviceInfo extends React.Component {
    render(){
        const { height: HEIGHT, width: WIDTH } = Dimensions.get('window')

        const dataPieChart = [{
            ...this.props.data, 
            monthlyConsumption:this.props.monthlyConsumption, 
            weeklyConsumption:this.props.weeklyConsumption
        }]
        const styles = StyleSheet.create({
            resume: {
                flexDirection: "column",
                alignItems: "center",
            }
        })
        const PieChartLegend = ({name, value, color}) => (                  
            <View style={{ flexDirection: "row", height: 30, marginBottom:18, width: "50%", borderRadius: 5, alignItems: "center", justifyContent: 'center' }}>
            <Circle radius={6.5} fill={color}style={{ marginRight: 5 }} />

            <View style={{ flexDirection: 'column' }}>
                <Text.Title fontSize={17}>
                {name}
            </Text.Title>
                <Text.Info fontSize={17}>
                {value}
            </Text.Info>
            </View>
            </View>
        )
        return (
            <View style={styles.resume}>
                <PieChart
                data={dataPieChart}
                width={HEIGHT / 4}
                height={HEIGHT / 4}
                chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
                accessor={this.props.selectedValue}
                backgroundColor="transparent"
                absolute
                paddingLeft={40}
                hasLegend={false}
                />
                <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-between" }}>
                <PieChartLegend name="Forno eletrico" value={`R$ ${this.props.selectedValue === "monthlyConsumption" ? this.props.monthlyConsumption : this.props.weeklyConsumption} `} color= "#F3A40C"/>
                <PieChartLegend name="Outros" value="R$ 160,000"color= "#c4c4c4"/>
                </View>
            </View>
        )
    }
}