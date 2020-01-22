import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, Animated } from 'react-native'

import { useTheme } from '../providers/ThemeProvider'
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

const Slides = ({ slides, onChange, next }) => {
    const [viewOpacity] = useState(new Animated.Value(0))
    const [grow] = useState(new Animated.Value(1))
    const [opacity] = useState(new Animated.Value(1))
    const [index, setIndex] = useState(0)

    const { theme } = useTheme()

    const fadeOpacity = cb => Animated.timing(opacity, { toValue: 0, duration: 300 }).start(() => {
        cb()
        Animated.timing(opacity, { toValue: 1, duration: 300 }).start()
    })

    const nextSlide = () => fadeOpacity(() => setIndex(Math.min(slides.length-1, index+1)))
    const prevSlide = () => fadeOpacity(() => setIndex(Math.max(0, index-1)))

    const Slide = slides[index]

    useEffect(() => {
        Animated.timing(viewOpacity, { toValue: 1, duration: 900 }).start()
        Animated.timing(grow, { toValue: 6, duration: 900 }).start()
    }, [])

    useEffect(() => {
        onChange({ isLastSlide: index === slides.length-1, index })
    }, [index])

    useEffect(() => { if(next) nextSlide() }, [next])

    return (
        <SwipeableView
            animated
            style={{...styles.slide, opacity: viewOpacity, flexGrow: grow, backgroundColor: theme.containerBackground }}
            onSwipeLeft={nextSlide}
            onSwipeRight={prevSlide}
        >
            <Animated.View style={{ opacity }}>
                <Slide />
            </Animated.View>

            <Pagination total={slides.length} index={index} style={{ alignSelf: 'flex-end', marginRight: 20 }} />
        </SwipeableView>

    )
}

export default Welcome = ({ navigation }) => {
    const [isLastSlide, setIsLastSlide] = useState(false)
    const [next, setNext] = useState(0)
    const nextSlide = () => setNext(next+1)

    const [buttonsOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(buttonsOpacity, {
            toValue: 1,
            delay: 1000,
            duration: 400
        }).start()
    }, [])

    const slidesList = [
        (
            props => (<View style={{ marginBottom: 30, paddingEnd: 30 }}>
                <Text.Title style={{ fontSize: 27, marginBottom: 10 }}>Bem vindo ao Futura</Text.Title>
                <Text.Content style={{ fontSize: 15 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </Text.Content>
            </View>)
        ),
        (
            props => (<View style={{ marginBottom: 30, paddingEnd: 30 }}>
                <Text.Title style={{ fontSize: 27, marginBottom: 10 }}>Economize</Text.Title>
                <Text.Content style={{ fontSize: 15 }}>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat
                </Text.Content>
            </View>)
        )
    ]

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <Slides slides={slidesList} next={next} onChange={({ isLastSlide }) => setIsLastSlide(isLastSlide)} />

                <Animated.View style={{...styles.navigation, opacity: buttonsOpacity }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text.Content>{!isLastSlide ? 'Pular' : 'Começar'}</Text.Content>
                    </TouchableOpacity>
                    {!isLastSlide && <TouchableOpacity
                        onPress={nextSlide}
                    >
                        <Text.Content>Próximo</Text.Content>
                    </TouchableOpacity>}

                </Animated.View>
            </View>
        </SafeAreaView>
    )
}
