import React from 'react'

import { View, Text, Button } from 'react-native'

import UserContext from '../../providers/User'

export default class DeviceEdit extends React.Component {
    static contextType = UserContext

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state

        const title = (params && params.device) ? `Editando ${params.device.name}` : 'Novo dispositivo'

        return {
            title
        }
    }

    render() {
        const _addDevice = () => {
            this.context.addDevice()
            this.props.navigation.goBack()
        }

        return (
            <View>
                <Text>Device info</Text>
                <Button
                    title="Add device"
                    onPress={_addDevice} />
            </View>
        )
    }
}