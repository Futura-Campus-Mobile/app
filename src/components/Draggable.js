import React, { useEffect, useContext } from 'react'

import { Animated, PanResponder, View } from 'react-native'

const Context = React.createContext()

class Draggable extends React.Component {
    state = {
        dropdowns: {},
        addDropdown: ({ name, x, y, w, h }) => this.setState(state => ({ dropdowns: { ...state.dropdowns, [name]: { x, y, w, h } } })),
        isOnDropdown: ({ x, y }) => {
            const { dropdowns } = this.state

            const entry = Object.entries(dropdowns)
                .find(([_, { x: dx, y: dy, w: dw, h: dh }]) => (dx <= x && x <= (dx+dw) && dy <= y && y <= (dy+dh)))

            if (entry) return entry[0]
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

class DraggableView extends React.Component {
    static contextType = Context

    state = {
        pan: new Animated.ValueXY(),
        isDragging: false
    }

    onComponentDidMount() {
        if (!this.context)
            throw new Error(
                "Draggable components must be inside Draggable"
            )
    }

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: e => {
            const { onDragStart = () => { }, disabled } = this.props

            if(disabled) return false

            this.state.pan.setValue({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY })

            this.setState({ isDragging: true })
            onDragStart()

            return true
        },
        onPanResponderMove: Animated.event([null, {
            dx: this.state.pan.x,
            dy: this.state.pan.y
        }]),
        onPanResponderRelease: (e, gesture) => {
            const { onDragEnd = () => { }, disabled } = this.props
            const { dx: x, dy: y } = gesture
            const onDropdownName = this.context.isOnDropdown({ x, y })

            if(!disabled){
                this.setState({ isDragging: false })
                onDragEnd(onDropdownName)
            }
            
            Animated.spring(
                this.state.pan,
                { toValue: { x: 0, y: 0 } }
            ).start()
        }
    })

    render() {
        const { isDragging } = this.state

        return (
            <Animated.View {...this.props}
                {...this.panResponder.panHandlers}
                style={[
                    this.state.pan.getLayout(), 
                    { position: isDragging ? 'absolute' : 'relative' },
                    this.props.style
                ]}
            />
        )
    }
}

const Dropdown = props => {
    const context = useContext(Context)
    const { name = '' } = props

    if (!context)
        throw new Error(
            "Draggable components must be inside Draggable"
        )

    return (
        <View
            {...props}
            onLayout={({ nativeEvent }) => {
                const { layout } = nativeEvent
                const { x, y, width: w, height: h } = layout
                
                context.addDropdown({ name, x, y, w, h })
            }}
        />
    )
}

Draggable.View = DraggableView
Draggable.Dropdown = Dropdown
export default Draggable