import React from 'react'

import { View } from 'react-native'

export default SwipableView = ({
    distance = 100,
    onSwipeUp = () => {},
    onSwipeDown = () => {},
    onSwipeLeft = () => {},
    onSwipeRight = () => {}, 
    ...props
}) => {
    const [startPosition, setStartPosition] = React.useState([0, 0])

    const onTouchEnd = ev => {
        const [x0, y0] = startPosition
        const { nativeEvent } = ev
        const { locationX: x, locationY: y } = nativeEvent
        const dx = x0 - x
        const dy = y0 - y

        if (dx > 0) onSwipeLeft()
        if (dx < 0) onSwipeRight()
        if (dy > 0) onSwipeUp()
        if (dy < 0) onSwipeDown()
    }

    return (
        <View
            {...props}
            onTouchStart={ev => setStartPosition([ev.nativeEvent.locationX, ev.nativeEvent.locationY])}
            onTouchEnd={onTouchEnd}
        />
    )
}