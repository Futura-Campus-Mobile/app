import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { Context as EstimatesContext } from '../../../providers/Estimates'
import { Context as UserContext } from '../../../providers/User'

export default class MyHome extends React.Component {
    state = {
        rooms: [],
        addRoomModalVisible: false,
        addDeviceModalVisible: false,
        deviceEditModalVisible: false,
        currentRoomIndex: -1,
        currentDevice: {},

        getCurrentRoom: () => this.state.currentRoomIndex !== -1 ? this.state.rooms[this.state.currentRoomIndex] : {},
        toggleAddRoomModal: () => this.setState({ addRoomModalVisible: !this.state.addRoomModalVisible }),
        toggleAddDeviceModal: () => this.setState({ addDeviceModalVisible: !this.state.addDeviceModalVisible }),
        toggleDeviceEditModal: () => this.setState({ deviceEditModalVisible: !this.state.deviceEditModalVisible }),
        setCurrentRoom: index => this.setState({ currentRoomIndex: index }),
        setCurrentDevice: device => this.setState({ currentDevice: device }),
        addDeviceToRoom: (device, roomId) => {
            const newRoom = this.state.rooms[roomId]
            newRoom.devices = [...newRoom.devices, device]

            const rooms = this.state.rooms.map((room, index) => (index !== roomId) ? room : newRoom)
        
            this.setState({ rooms })
        },
        removeRoom: index => {},
        addRoom: room => this.setState({ rooms: [...this.state.rooms, { name: room, devices: [] }] }),
    }

    render(){
        const { 
            rooms, addRoomModalVisible, addDeviceModalVisible,
            deviceEditModalVisible, toggleDeviceEditModal,
            toggleAddDeviceModal, toggleAddRoomModal, addRoom,
            getCurrentRoom, addDeviceToRoom, setCurrentRoom,
            currentRoomIndex, currentDevice, setCurrentDevice,
            removeRoom
        } = this.state

        const getAllDevices = () => rooms.map(room => room.devices)

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
                    <Icon name="close" size={20}/>
                </TouchableOpacity>
                <View style={{
                    padding: 20
                }}>
                    <Text>{name}: {devicesQuantity} dispositivo(s)</Text>
                </View>
            </View>
        )

        const AddRoomModal = ({ defaultRooms }) => (
            <Modal
                animationType="slide"
                transparent={false}
                visible={addRoomModalVisible}
            >
                <View style={{ padding: 40 }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TouchableOpacity onPress={toggleAddRoomModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                    {defaultRooms.map((room, index) => 
                        <TouchableOpacity 
                            key={index}
                            onPress={
                                () => {
                                    addRoom(room)
                                    toggleAddRoomModal()
                                }
                            }
                        >
                            <Text>{room}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                            onPress={
                                () => {
                                    addRoom('Outro')
                                    toggleAddRoomModal()
                                }
                            }
                        >
                        <Text>Outro</Text>
                    </TouchableOpacity>
                </View>
                
            </Modal>
        )

        const AddDeviceModal = ({ defaultRoomDevices }) => (
            <Modal
                animationType="slide"
                transparent={false}
                visible={addDeviceModalVisible}
            >
                <View style={{ padding: 40 }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TouchableOpacity onPress={toggleAddDeviceModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                    {!getCurrentRoom() && getCurrentRoom().devices.map((device, index) => <Text key={index}>{device.name}</Text>)}
                    <Text>{'\n'}</Text>

                    {defaultRoomDevices.map((device, index) => 
                        <TouchableOpacity 
                            key={index}
                            onPress={
                                () => {
                                    setCurrentDevice(device)
                                    toggleAddDeviceModal()
                                    toggleDeviceEditModal()
                                }
                            }
                        >
                            <Text>{device.name}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        onPress={
                            () => {
                                setCurrentDevice({ name: 'Outro' })
                                toggleAddDeviceModal()
                                toggleDeviceEditModal()
                            }
                        }
                    >
                        <Text>Outro</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )

        const DeviceEditModal = ({ }) => (
            <Modal
                animationType="slide"
                transparent={false}
                visible={deviceEditModalVisible}
            >
                <View style={{ padding: 40 }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TouchableOpacity onPress={toggleDeviceEditModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>Nome: {currentDevice.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        addDeviceToRoom(currentDevice, currentRoomIndex)
                        toggleDeviceEditModal()
                    }}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )

        return (
            <View style={{ padding: 40, flexWrap: 'nowrap' }}>
                <EstimatesContext.Consumer>
                    {({ getDevicesByRoom, defaultRooms }) => (
                        <>
                            <AddRoomModal 
                                defaultRooms={defaultRooms}
                            />
                            <AddDeviceModal 
                                defaultRoomDevices={getDevicesByRoom(getCurrentRoom().name)}
                            />
                            <DeviceEditModal
                            />
                        </>
                    )}
                </EstimatesContext.Consumer>

                {rooms.map((room, index) =>
                        <TouchableOpacity 
                            key={index}
                            onPress={() => { 
                                setCurrentRoom(index)
                                toggleAddDeviceModal()
                            }}
                        >
                            <Room
                                index={index}
                                name={room.name}
                                devicesQuantity={room.devices.length}
                            />
                        </TouchableOpacity>
                )}

                <TouchableOpacity onPress={toggleAddRoomModal}>
                    <Text>Add room</Text>
                </TouchableOpacity>

                <UserContext.Consumer>
                    {({ }) => (
                        <TouchableOpacity onPress={() => { 
                            console.log(getAllDevices(rooms))
                        }}>
                            <Text>Save changes</Text>
                        </TouchableOpacity>
                    )}
                </UserContext.Consumer>

            </View>
        )
    }
}