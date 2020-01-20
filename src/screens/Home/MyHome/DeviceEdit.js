import React from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default DeviceEdit = ({ close, onDeviceEdit, currentDevice }) => (
    <View style={{ padding: 40 }}>
        <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity onPress={close}>
                <Icon name="close" size={20}/>
            </TouchableOpacity>
        </View>
        <View>
            <TextInput>{currentDevice.name}</TextInput>
        </View>
        <TouchableOpacity onPress={() => onDeviceEdit()}>
            <Text>Add</Text>
        </TouchableOpacity>
    </View>
)