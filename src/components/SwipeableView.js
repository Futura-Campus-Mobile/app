import React from 'react'

import { View, Animated } from 'react-native'

export default SwipableView = ({
    distance = 100,
    animated = false,
    onSwipeUp = () => { },
    onSwipeDown = () => { },
    onSwipeLeft = () => { },
    onSwipeRight = () => { },
    ...props
}) => {
    const [startPosition, setStartPosition] = React.useState([0, 0])

    const onTouchEnd = ev => {
        const [x0, y0] = startPosition
        const { nativeEvent } = ev
        const { locationX: x, locationY: y } = nativeEvent
        const dx = x0 - x
        const dy = y0 - y

        if (dx > distance) onSwipeLeft()
        if (dx < -distance) onSwipeRight()
        if (dy > distance) onSwipeUp()
        if (dy < -distance) onSwipeDown()
    }

    return animated ? (
        <Animated.View
            {...props}
            onTouchStart={ev => setStartPosition([ev.nativeEvent.locationX, ev.nativeEvent.locationY])}
            onTouchEnd={onTouchEnd}
        />
    ) : (
        <View
            {...props}
            onTouchStart={ev => setStartPosition([ev.nativeEvent.locationX, ev.nativeEvent.locationY])}
            onTouchEnd={onTouchEnd}
        />
    )
}