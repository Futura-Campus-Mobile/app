import React from 'react'

import { Text } from 'react-native'

import * as ExpoFont from 'expo-font'

export default class Font extends React.Component {
    state = {
        fontLoaded: false
    }
    
    async componentDidMount(){
        await ExpoFont.loadAsync({
            'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        })

        this.setState({ fontLoaded: true })
    }

    render(){
        const { name, children, style } = this.props 

        return (
            <Text style={{ 
                ...style,
                fontFamily: this.state.fontLoaded ? name : undefined
            }}>{children}</Text> 
        )
    }
}