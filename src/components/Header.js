import React from 'react'
import { View, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient' 

import { useTheme } from '../providers/ThemeProvider'

import Text from './Text'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default Header = ({ title, goBack }) => {
    const { theme } = useTheme()

    return (
        <View style={{ marginTop: StatusBar.currentHeight }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    height: HEIGHT,
                    width: WIDTH,
                    position: 'absolute'
                }}
            >
                <View 
                    style={{ 
                        flexGrow: 1, 
                        borderBottomRightRadius: 30, 
                        borderBottomLeftRadius: 30, 
                        overflow: 'hidden'
                    }}
                >
                    <LinearGradient
                        colors={[theme.headerPrimary, theme.headerSecondary]}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={{ flexGrow: 1 }}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: '#efefef',
                        flexGrow: 3
                    }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                {goBack && (
                    <TouchableOpacity onPress={goBack} style={{ padding: 20 }}>
                        <Icon color='#fff' size={22} name="arrow-back" />
                    </TouchableOpacity>
                )}

            </View>
            <View
                style={{
                    marginTop: !goBack && 50,
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                }}
            >
                <Text.Header fontSize={30} style={{ color: '#fff' }}>
                    {title}
                </Text.Header>
            </View>
        </View>
    )
}