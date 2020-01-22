import React from 'react'

import { View, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet } from 'react-native'

import SwipeableView from '../components/SwipeableView'
import Circle from '../components/Circle'
import Text from '../components/Text'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: Dimensions.get('window').height - 20
    },
    slide: {
        padding: 40,
        backgroundColor: '#C5C5C5',
        flexGrow: 6,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    navigation: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

const range = n => [...Array(n).keys()]

const Pagination = ({ total = 1, index = 0, size = 4, style }) => (
    <View style={{ flexDirection: 'row', ...style }}>
        {range(total).map(i => (<Circle key={i} radius={size} fill={i === index ? 'black' : 'gray'} style={{ margin: size }} />))}
    </View>
)

export default class Welcome extends React.Component {
    state = {
        totalSlides: 2,
        slideIndex: 0,
        nextSlide: () => this.setState(state => ({ slideIndex: Math.min(state.totalSlides-1, state.slideIndex+1) })),
        prevSlide: () => this.setState(state => ({ slideIndex: Math.max(0, state.slideIndex - 1) })),
        isLastSlide: () => (this.state.slideIndex !== this.state.totalSlides-1) 
    }

    render() {
        const { navigation } = this.props
        const { totalSlides, slideIndex, nextSlide, prevSlide, isLastSlide } = this.state

        const slidesList = [
            (
                <View style={{ marginBottom: 30, paddingEnd: 30 }}>
                    <Text.Title style={{ fontSize: 27, marginBottom: 10 }}>Bem vindo ao Futura</Text.Title>
                    <Text.Content style={{ fontSize: 15 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </Text.Content>
                </View>
            ),
            (
                <View style={{ marginBottom: 30, paddingEnd: 30 }}>
                    <Text.Title style={{ fontSize: 27, marginBottom: 10 }}>Economize</Text.Title>
                    <Text.Content style={{ fontSize: 15 }}>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat
                    </Text.Content>
                </View>
            )
        ]

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <SwipeableView
                        style={styles.slide}
                        onSwipeLeft={nextSlide}
                        onSwipeRight={prevSlide}
                    >
                        {slidesList[slideIndex]}
                        <Pagination total={totalSlides} index={slideIndex} style={{ alignSelf: 'flex-end', marginRight: 20 }} />
                    </SwipeableView>
                    <View style={styles.navigation}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <Text.Content>{isLastSlide() ? 'Pular' : 'Começar'}</Text.Content>
                        </TouchableOpacity>
                        {isLastSlide() && <TouchableOpacity
                            onPress={nextSlide}
                        >
                            <Text.Content>Próximo</Text.Content>
                        </TouchableOpacity>}

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}