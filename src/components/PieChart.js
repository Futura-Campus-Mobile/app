import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { View, Text, Dimensions } from 'react-native';
import { Context as UserContext } from '../providers/User'

export default class GeneralPieChart extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static contextType = UserContext

    render() {
        const { devices } = this.context
        const data = devices.map((device)=>(
            {
                key: device.id,
                value:50,
                svg:{
                    fill: device.color
                }
            }

        ))

        const deviceWidth = Dimensions.get('window').width

        return (
            <View style={{ justifyContent: 'center'}}>
                <PieChart
                    style={{ height: 150, minWidth:150 }}
                    outerRadius={'100%'}
                    innerRadius={55}
                    data={data}
                />
                <Text
                    style={{
                        position: 'absolute',
                        left: deviceWidth/12 ,
                        textAlign: 'center',
                        fontWeight:"bold"
                    }}
                >
                    Total: 180 R$
                </Text>
            </View>
        )
    }

}