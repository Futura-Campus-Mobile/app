import React from 'react'

import { View, SafeAreaView, Text, Button, ActivityIndicator } from 'react-native'

import { Context as UserContext } from '../../providers/User'
import { openWifiSettings } from '../../helpers/platform'

export default class PlugEdit extends React.Component {
    static contextType = UserContext

    state = {
        loading: true,
        plugData: {},
        error: ''
    }

    componentDidMount() {
        this.searchByPlug()
    }

    async searchByPlug(){
        try {
            const response = await fetch('http://172.217.28.1/deviceinfo')

            if (!response.ok)
                throw new Error('Nenhum Plug encontrado')

            const plugData = await response.json()

            this.setState({ plugData, loading: false })

        } catch (err) {
            this.setState({ error: err.message, loading: false })
        }
    }

    addPlug = () => {
        this.context.addPlug()
        this.props.navigation.goBack()
    }

    render() {
        const { loading, plugData, error } = this.state

        return (
            <SafeAreaView>
                {!loading ? (
                    <View>
                        <Text>Plug info</Text>
                        {!!error ? (
                            <>
                                <Text>{error}</Text>
                                <Button title="Open WiFi Settigns" onPress={openWifiSettings} />
                            </>
                        ) : (
                            <>
                                <Text>{`Plug encontrado: ${plugData.id}`}</Text>
                                <Button title="Add plug" onPress={this.addPlug} />
                            </>
                        )}
                    </View>
                ) : (
                    <View>
                        <ActivityIndicator/>
                    </View>
                )}
            </SafeAreaView>
        )
    }
}