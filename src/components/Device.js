import React, { useState } from 'react'

import { TouchableOpacity, View } from 'react-native'

import Text from '../components/Text'

const ElapsedTime = ({ isOn }) => (
    <View style={{ flexGrow: 1, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
        {isOn && <View style={{ backgroundColor: '#70956D', height: 5, width: 5, borderRadius: 25, marginRight: 5 }} />}
        <Text.Info style={{ color: isOn ? '#70956D' : '#808080', }}>
            {isOn ? '14 horas ligado' : 'Desligado' }
        </Text.Info>
    </View>
)

export default Device = ({ onLongPress, onPress, name = "" }) => {
    const [isOn, setIsOn] = useState(true)

    return (
        <TouchableOpacity
            style={{
                padding: 15,
                margin: 5,
                width: "46%",
                backgroundColor: 'white',
                borderRadius: 10,
                flexDirection: 'column'
            }}
            onPress={() => setIsOn(!isOn)}
            onLongPress={onLongPress}
        >
            <Text.Title style={{ color: "black", fontSize: 16 }}>{name}</Text.Title>
            <ElapsedTime isOn={isOn}/>
            <View style={{ alignItems: 'center', backgroundColor: '#263154', padding: 5, borderRadius: 5 }}>
                <Text.Content style={{ color: "#FFF" }}>- R$60</Text.Content>
            </View>
        </TouchableOpacity>
    )
}