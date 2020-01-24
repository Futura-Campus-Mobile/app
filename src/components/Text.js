import React from 'react'

import { Text, Platform, PixelRatio, Dimensions } from 'react-native'

import { useTheme } from '../providers/ThemeProvider'

const { width: SCREEN_WIDTH } = Dimensions.get('screen')
const SCALE = SCREEN_WIDTH / 414

export const normalizeFontSize = (size) => {
    size *= SCALE

    return Math.round(PixelRatio.roundToNearestPixel(size)) - ((Platform.OS !== 'ios') && 2)
}

const withFontFamily = fontFamily => props => {
    const { theme } = useTheme()

    return (
        <Text 
            {...props} 
            style={{ 
                color: theme.primaryText, 
                fontSize: normalizeFontSize(props.fontSize || 16), 
                ...props.style, fontFamily
            }}
        />
    )
}

Text.Header = withFontFamily('montserrat-bold')
Text.Content = withFontFamily('raleway-regular')
Text.Info = withFontFamily('raleway-light')
Text.Title = withFontFamily('raleway-medium')

export default Text