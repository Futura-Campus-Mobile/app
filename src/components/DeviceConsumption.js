import React, { useState } from 'react'

import { View, Dimensions, TouchableOpacity } from 'react-native'

import { getMonthWeeks, getWeekDays, range, byPeriod } from '../helpers/date'
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window')

import { LineChart } from 'react-native-chart-kit'

import Card from './Card'
import Text from './Text'

const getRandomValues = n => range(n).map(() => Math.random() * 10)

export default DeviceConsumtion = () => {
    const [filterIndex, setFilterIndex] = useState(0)
    const filters = ['Hoje', 'Na semana', 'No mês']

    const labels = filterIndex === 0 ? 
        byPeriod(range(24), 3) : 
        (filterIndex === 1 ? getWeekDays(3) : getMonthWeeks())

    const data = getRandomValues(labels.length)

    const Select = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 15
            }}
        >
            {filters.map((filter, index) => (
                <TouchableOpacity key={index} onPress={() => setFilterIndex(index)}>
                    <Text.Content style={{ color: filterIndex==index ? '#000' : '#c5c5c5' }}>
                        {filter}
                    </Text.Content>
                </TouchableOpacity>
            ))}
        </View>
    )

    return (
        <Card>
            <Select />

            <LineChart
                data={{
                    labels,
                    datasets: [
                        { data }
                    ]
                }}
                withInnerLines={false}
                withOuterLines={false}
                width={WIDTH-105}
                height={220}
                yAxisLabel="R$"
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.2)`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "1",
                        stroke: "#fff"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </Card>
    )
}