import React from 'react'

import { View } from 'react-native'

export default Card = props => {
    return (
        <View {...props} style={{
            backgroundColor: '#fff',
            padding: 20,
            marginHorizontal: 35,
            marginVertical: 20,
            borderRadius: 10,
            ...props.style
        }} />
    )
}