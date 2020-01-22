import React, { useState } from 'react'

import { View, TextInput as NativeTextInput } from 'react-native'

export default TextInput = ({ placeholder='Type something', onChangeText, ...props }) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
        <View style={{ marginHorizontal: 40, marginVertical: 2 }}>
            <NativeTextInput
                {...props}
                style={{ 
                    height: 60, 
                    backgroundColor: '#e7e7e7',
                    paddingVertical: 15,
                    paddingHorizontal: 20
                }}
                placeholder={placeholder}
                onFocus={() => setHasFocus(true)}
                onEndEditing={() => setHasFocus(false)}
            />
            <View style={{ height: 2, width: '100%', backgroundColor: hasFocus ? 'purple' : 'transparent' }}/>
        </View>
    )
}