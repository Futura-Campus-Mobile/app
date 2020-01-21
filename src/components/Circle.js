import React from 'react'

import { View } from 'react-native'

export default Circle = ({ radius = 5, fill = 'black', style, ...props }) => (
    <View {...props}
        style={{
            backgroundColor: fill,
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius,
            ...style
        }} />
)