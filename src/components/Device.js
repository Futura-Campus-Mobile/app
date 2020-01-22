import React, { useState } from 'react'

import { TouchableOpacity, View } from 'react-native'

import Text from '../components/Text'

const ElapsedTime = () => (
    <View style={{ flexGrow: 1, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#70956D', height: 5, width: 5, borderRadius: 25, marginRight: 5 }} />
        <Text.Info style={{ color: '#70956D' }}>
            14 horas ligado
        </Text.Info>
    </View>
)

export default Device = ({ onPress, name = "", connectedTo }) => {
    return (
        <TouchableOpacity
            style={{
                padding: 15,
                margin: 5,
                backgroundColor: connectedTo ? 'blue' : 'white',
                borderRadius: 10,
                flexDirection: 'column'
            }}
            onPress={onPress}
        >
            <Text.Title style={{ color: "black", fontSize: 16 }}>{name}</Text.Title>
            <ElapsedTime />
            <View style={{ alignItems: 'center', backgroundColor: '#263154', padding: 5, borderRadius: 5 }}>
                <Text.Content style={{ color: "#FFF" }}>- R$60</Text.Content>
            </View>
        </TouchableOpacity>
    )
}