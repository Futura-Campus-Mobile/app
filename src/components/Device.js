import React from 'react'

import { TouchableOpacity, Text } from 'react-native'

export default Device = ({ onPress, name=""  }) => (
    <TouchableOpacity
        style={{
            padding: 10,
            margin: 10,
            width: 100,
            backgroundColor: '#a152ca',
            borderRadius: 10
        }}
        onPress={onPress}
    >
        <Text>{name}</Text>
    </TouchableOpacity>
)