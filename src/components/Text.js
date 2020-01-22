import React from 'react'

import { Text } from 'react-native'

import { useTheme } from '../providers/ThemeProvider'

const withFontFamily = fontFamily => props => {
    const { theme } = useTheme()

    return (
        <Text {...props} style={{ color: theme.primaryText, ...props.style, fontFamily }} />
    )
}

Text.Header = withFontFamily('montserrat-bold')
Text.Content = withFontFamily('raleway-regular')
Text.Info = withFontFamily('raleway-light')
Text.Title = withFontFamily('raleway-medium')

export default Text