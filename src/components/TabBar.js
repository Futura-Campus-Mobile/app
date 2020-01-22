import React, { useEffect, useState } from 'react'

import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabBar: {
        backgroundColor: '#fff',
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 90,
        elevation: 2
    },
    fabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 70,
        borderRadius: 25,
        width: 75,
        height: 75,
        elevation: 5
    },
    barButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50
    },
    actionBar: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        backgroundColor: '#dcdcdc',
        height: 90
    }
})

const BarButton = ({ iconName, text, size = 25, selected = false, showText = true, onPress }) => (
    <TouchableOpacity style={styles.barButton} onPress={onPress}>
        <Icon name={iconName} color={selected ? '#000' : '#b7b7b7'} size={size} />
        {(!selected && showText) && <Text
            style={{
                fontSize: size / 2.2,
                fontFamily: 'raleway-regular',
                color: '#b7b7b7'
            }}
        >{text}</Text>}
    </TouchableOpacity>
)

const ActionBar = ({ navigation, show, toggle }) => {
    const [bottom] = useState(new Animated.Value(-100))

    useEffect(() => {
        Animated.spring(bottom, { toValue: show ? 0 : -100}).start()
    }, [show])

    return (
        <Animated.View style={{...styles.actionBar, bottom }}>
            <BarButton
                iconName="kitchen"
                text="Device"
                size={30}
                onPress={() => { toggle(), navigation.navigate('DeviceEdit') }}
            />
            <View style={{ height: 90, backgroundColor: '#d2d2d2', width: 1.2 }} />
            <BarButton
                iconName="power"
                text="Plug"
                size={30}
                onPress={() => { toggle(), navigation.navigate('PlugEdit') }}
            />
        </Animated.View>
    )
}

export default class TabBar extends React.Component {
    state = {
        showActionBar: false,
        barHeight: new Animated.Value(90),
        toggleActionBar: () => this.setState({ showActionBar: !this.state.showActionBar }),
        isActiveRoute: name => this.props.navigation.state.routes[this.props.navigation.state.index].routeName === name,
        mode: {
            goBack: {
                fabIconName: 'keyboard-arrow-left',
                buttomColor: '#000',
                iconColor: '#fff',
                onPress: () => this.props.navigation.navigate('Home')
            },
            addDevice: {
                fabIconName: 'add',
                buttomColor: '#9510AC',
                onPress: () => this.state.toggleActionBar()
            },
            closeActionBar: {
                fabIconName: 'keyboard-arrow-down',
                buttomColor: '#7B0D8F',
                onPress: () => this.state.toggleActionBar()
            }
        },
        getCurrentMode: () => {
            const { mode, isActiveRoute } = this.state

            if (!isActiveRoute('Home'))
                return mode.goBack

            if (this.state.showActionBar)
                return mode.closeActionBar

            return mode.addDevice
        }
    }

    render() {
        const { navigation } = this.props
        const {
            toggleActionBar, barHeight, getCurrentMode,
            isActiveRoute, showActionBar, mode
        } = this.state

        Animated.spring(this.state.barHeight, { toValue: this.state.isActiveRoute('Home') ? 90 : 50 }).start()

        if (showActionBar && getCurrentMode() !== mode.closeActionBar)
            toggleActionBar()

        return (
            <View style={styles.container}>
                <ActionBar navigation={navigation} show={showActionBar} toggle={toggleActionBar} />
                <Animated.View style={{ ...styles.tabBar, height: barHeight }}>
                    <BarButton
                        iconName="equalizer"
                        text="Overview"
                        showText={isActiveRoute('Home')}
                        selected={isActiveRoute('Overview')}
                        onPress={() => navigation.navigate('Overview')}
                    />
                    <TouchableOpacity style={{ ...styles.fabButton, backgroundColor: getCurrentMode().buttomColor }} onPress={getCurrentMode().onPress}>
                        <Icon name={getCurrentMode().fabIconName} color={getCurrentMode().iconColor || '#fff'} size={40}></Icon>
                    </TouchableOpacity>
                    <BarButton
                        iconName="person-outline"
                        text="Profile"
                        showText={isActiveRoute('Home')}
                        selected={isActiveRoute('Profile')}
                        onPress={() => navigation.navigate('Profile')}
                    />
                </Animated.View>
            </View>
        )
    }
}