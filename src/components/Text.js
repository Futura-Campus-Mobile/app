import React from 'react'

import { Text } from 'react-native'

const withFontFamily = fontFamily => props => <Text {...props} style={{ ...props.style, fontFamily }} />

Text.Header = withFontFamily('montserrat-bold')
Text.Content = withFontFamily('raleway-regular')
Text.Info = withFontFamily('raleway-light')
Text.Title = withFontFamily('raleway-medium')

export default Text