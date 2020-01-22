import React from 'react'

import { Text, Platform, PixelRatio, Dimensions } from 'react-native'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('screen');
  
const scale = SCREEN_WIDTH / 414;

export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
const withFontFamily = fontFamily => (props) => <Text {...props} style={{ fontSize: props.fontSize == null ? normalize(16) : normalize(props.fontSize), ...props.style, fontFamily }} />

Text.Header = withFontFamily('montserrat-bold')
Text.Content = withFontFamily('raleway-regular')
Text.Info = withFontFamily('raleway-light')
Text.Title = withFontFamily('raleway-medium')

export default Text