import React from 'react'

import { Text as NativeText } from 'react-native'

const Text = props => <NativeText {...props}/>

const withFontFamily = fontFamily => props => <Text {...props} style={{ ...props.style, fontFamily }} />

Text.Header = withFontFamily('montserrat-bold')
Text.Content = withFontFamily('raleway-regular')

export default Text