import React from 'react'

import { View, Button, Text, StatusBar } from 'react-native'

export default class Welcome extends React.Component {
    render() {
        const { navigation } = this.props

        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <Text>Bem vindo ao Futura</Text>
                <Button
                    onPress={() => navigation.navigate('SignIn')}
                    title="Começar a utilizar"
                />
            </View>
        )
    }
}