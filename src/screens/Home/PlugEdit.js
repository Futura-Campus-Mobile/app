import React from 'react'

import { View, SafeAreaView, Button, ActivityIndicator } from 'react-native'

import Text from '../../components/Text'
import Card from '../../components/Card'
import Header from '../../components/Header'

import { Context as UserContext } from '../../providers/User'
import { openWifiSettings } from '../../helpers/platform'

export default class PlugEdit extends React.Component {
    static contextType = UserContext

    state = {
        loading: false,
        plugData: { id: '192f' },
        error: ''
    }

    componentDidMount() {
        // this.searchByPlug()
    }

    async searchByPlug() {
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
                <Header title="Adicionar novo Plug" goBack={() => this.props.navigation.goBack()}/>
                {!loading ? (
                    <Card>
                        {!!error ? (
                            <>  
                                <Text.Title fontSize={20} style={{ marginBottom: 10 }}>Nenhum Plug foi encontrado</Text.Title>
                                <Text>{error}</Text>
                                <Button title="Open WiFi Settigns" onPress={openWifiSettings} />
                            </>
                        ) : (
                                <>
                                    <Text.Title fontSize={20} style={{ marginBottom: 10 }}>Plug encontrado</Text.Title>
                                    <Text.Info>{plugData.id}</Text.Info>
                                    <Button title="Add plug" onPress={this.addPlug} />
                                </>
                            )}
                    </Card>
                ) : (
                        <View>
                            <ActivityIndicator />
                        </View>
                    )}
            </SafeAreaView>
        )
    }
}