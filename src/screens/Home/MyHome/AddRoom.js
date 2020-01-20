import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default AddRoom = ({ defaultRoomNames, onAddRoom, close }) => (
    <View style={{ padding: 40 }}>
        <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity onPress={close}>
                <Icon name="close" size={20}/>
            </TouchableOpacity>
        </View>
        {defaultRoomNames.map((room, index) =>
            <TouchableOpacity
                key={index}
                onPress={() => onAddRoom(room)}
            >
                <Text>{room}</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity
            onPress={() => onAddRoom('Outro')}
        >
            <Text>Outro</Text>
        </TouchableOpacity>
    </View>
)