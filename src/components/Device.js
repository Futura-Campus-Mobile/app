import React from 'react'

import { TouchableOpacity, Text } from 'react-native'

export default Device = ({ onPress, name="", color="black"  }) => (
    <TouchableOpacity
        style={{
            padding: 10,
            marginTop:5,
            width: "46%",
            height:160,
            backgroundColor: 'white',
            borderRadius: 10
        }}
        onPress={onPress}
    >
        <Text style={{color:color, fontSize:16, fontWeight:"700"}}>{name}</Text>
        <Text style={{color:"grey", marginTop:10}}>14 horas ligado  </Text>
        <Text style={{color:"grey", marginTop:10}}>60 reais consumidos  </Text>
    </TouchableOpacity>
)