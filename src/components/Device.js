import React from 'react'

import { TouchableOpacity, View, Switch } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Text from '../components/Text'
import Circle from '../components/Circle'

export default Device = ({ onPress, name = "", room, icon = "application", connectedTo }) => {
    return (
        <View
            style={{
                padding: !connectedTo ? 0 : 2,
                margin: 5,
                width: 130,
                backgroundColor: '#f6f6f6',
                borderRadius: 10,
                flexDirection: 'column'
            }}
        >
            <TouchableOpacity
                style={{
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    padding: 15,
                    flexGrow: 1
                }}
                onPress={onPress}
            >
                <View
                    style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Icon name={icon} size={35} />
                    <Circle fill='#E6FFE4' radius={10}>
                        <Circle fill='#4FB247' radius={4.5} />
                    </Circle>
                </View>

                <Text.Title style={{ color: "black", fontSize: 15, marginBottom: 6 }}>{name}</Text.Title>
                {!!room && <Text.Info fontSize={10}>Em <Text.Title fontSize={10}>{room}</Text.Title></Text.Info>}
            </TouchableOpacity>
            {connectedTo && (
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Switch style={{ marginBottom: 10 }} />
                    <Text.Info fontSize={10} style={{ color: '#a8a8a8' }}>Conectado ao Plug 81f2</Text.Info>
                </View>
            )}

        </View>
    )
}