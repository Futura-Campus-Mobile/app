import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { Context as EstimatesContext } from '../../../providers/Estimates'
import { Context as UserContext } from '../../../providers/User'

import AddRoom from './AddRoom'
import AddDevice from './AddDevice'
import DeviceEdit from './DeviceEdit'

export default class MyHome extends React.Component {
    static contextType = UserContext

    state = {
        rooms: this.context.getDevicesByRoom(),
        removeRoom: index => this.setState({ rooms: [...this.state.rooms.filter((_, i) => i !== index)] }),
        addRoom: roomName => this.setState({ rooms: [...this.state.rooms, { name: roomName, devices: [] }] }),

        modalVisible: undefined,
        setModalVisible: modalName => this.setState({ modalVisible: modalName }),

        currentRoomIndex: -1,
        getCurrentRoom: () => this.state.rooms[this.state.currentRoomIndex],
        setCurrentRoom: index => this.setState({ currentRoomIndex: index }),

        currentDevice: {},
        setCurrentDevice: device => this.setState({ currentDevice: device }),

        addDeviceToRoom: (device, roomId) => {
            const newRoom = this.state.rooms[roomId]
            newRoom.devices = [...newRoom.devices, device]

            const rooms = this.state.rooms.map((room, index) => (index !== roomId) ? room : newRoom)

            this.setState({ rooms })
        },
    }

    render() {
        const {
            rooms, addRoom, getCurrentRoom, addDeviceToRoom,
            setCurrentRoom, currentRoomIndex, currentDevice,
            setCurrentDevice, removeRoom, modalVisible, setModalVisible
        } = this.state
        const { navigation } = this.props

        const getAllDevices = () => rooms.reduce((acc, room) => 
            [...acc, ...room.devices.map(device => ({ ...device, room: room.name }))], [])

        const Room = ({ name, devicesQuantity, index }) => (
            <View style={{
                width: 120,
                borderColor: '#ddd',
                borderWidth: 1,
                borderRadius: 10
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row-reverse',
                        paddingTop: 10,
                        paddingLeft: 10
                    }}
                    onPress={() => removeRoom(index)}
                >
                    <Icon name="close" size={20} />
                </TouchableOpacity>
                <View style={{
                    padding: 20
                }}>
                    <Text>{name}: {devicesQuantity} dispositivo(s)</Text>
                </View>
            </View>
        )

        return (
            <View style={{ padding: 20 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <EstimatesContext.Consumer>
                        {({ getDefaultDevicesByRoom, defaultRoomNames }) => (
                            <>
                                <Modal
                                    animationType="slide"
                                    visible={modalVisible === 'AddRoom'}
                                >
                                    <AddRoom
                                        defaultRoomNames={defaultRoomNames}
                                        onAddRoom={roomName => { addRoom(roomName), setModalVisible() }}
                                        close={() => setModalVisible()}
                                    />
                                </Modal>
                                <Modal
                                    animationType="slide"
                                    visible={modalVisible === 'AddDevice'}
                                >
                                    <AddDevice
                                        defaultRoomDevices={getCurrentRoom() && getDefaultDevicesByRoom(getCurrentRoom().name)}
                                        currentRoom={getCurrentRoom()}
                                        onAddDevice={device => {setCurrentDevice(device), setModalVisible('DeviceEdit')}}
                                        close={() => setModalVisible()}
                                    />
                                </Modal>
                                <Modal
                                    animationType="slide"
                                    visible={modalVisible === 'DeviceEdit'}
                                >
                                    <DeviceEdit
                                        close={() => setModalVisible()}
                                        currentDevice={currentDevice}
                                        onDeviceEdit={() => {addDeviceToRoom(currentDevice, currentRoomIndex), setModalVisible()}}
                                    />
                                </Modal>
                            </>
                        )}
                    </EstimatesContext.Consumer>

                    {rooms.map((room, index) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => {setCurrentRoom(index), setModalVisible('AddDevice')}}
                        >
                            <Room
                                index={index}
                                name={room.name}
                                devicesQuantity={room.devices.length}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity onPress={() => setModalVisible('AddRoom')}>
                    <Text>Add room</Text>
                </TouchableOpacity>

                <UserContext.Consumer>
                    {({ setDevices }) => (
                        <TouchableOpacity onPress={() => { setDevices(getAllDevices()), navigation.navigate('Home')}}>
                            <Text>Save changes</Text>
                        </TouchableOpacity>
                    )}
                </UserContext.Consumer>

            </View>
        )
    }
}