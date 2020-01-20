import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default AddDevice = ({ defaultRoomDevices, currentRoom, onAddDevice, close }) => (
    <View style={{ padding: 40 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{currentRoom.name}</Text>

            <TouchableOpacity onPress={close}>
                <Icon name="close" size={20} />
            </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 10 }}>
            {currentRoom.devices.map((device, index) => <Text key={index}>{device.name}</Text>)}
        </View>

        {defaultRoomDevices.map((device, index) =>
            <TouchableOpacity
                key={index}
                onPress={() => onAddDevice(device)}
            >
                <Text>{device.name}</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity
            onPress={() => onAddDevice({ name: 'Outro' })}
        >
            <Text>Outro</Text>
        </TouchableOpacity>
    </View>
)