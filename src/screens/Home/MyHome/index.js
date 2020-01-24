import React from 'react'
import { View, TouchableOpacity, Modal, SafeAreaView } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { Context as EstimatesContext } from '../../../providers/Estimates'
import { Context as UserContext } from '../../../providers/User'

import Text from '../../../components/Text'
import Header from '../../../components/Header'
import Card from '../../../components/Card'

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
            <Card style={{
                marginHorizontal: 20,
                padding: 20,
                flexDirection: 'column'
            }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        padding: 10
                    }}
                    onPress={() => removeRoom(index)}
                >
                    <Icon name="trash" size={15} />
                </TouchableOpacity>
                <View style={{
                }}>
                    <Icon name="bed" size={20} style={{ marginBottom: 10 }} />
                    <Text.Title>{name}</Text.Title>
                    <Text.Info>{devicesQuantity} dispositivo(s)</Text.Info>
                </View>
            </Card>
        )

        return (
            <SafeAreaView>
                <Header title="Meus dispositivos" goBack={() => this.props.navigation.goBack()}/>

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <EstimatesContext.Consumer>
                        {({ getDefaultDevicesByRoom, defaultRoomNames }) => (
                            <>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
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
                                    transparent={true}
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
                                    transparent={true}
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

                <View 
                    style={{ 
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{ padding: 5 }}
                        onPress={() => setModalVisible('AddRoom')}
                    >
                        <Text.Title>Adicionar novo cômodo</Text.Title>
                    </TouchableOpacity>

                    <UserContext.Consumer>
                        {({ setDevices }) => (
                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => { setDevices(getAllDevices()), navigation.navigate('Home')}}
                            >
                                <Text.Content>Salvar alterações</Text.Content>
                            </TouchableOpacity>
                        )}
                    </UserContext.Consumer>
                    </View>

            </SafeAreaView>
        )
    }
}