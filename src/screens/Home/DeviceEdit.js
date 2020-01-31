import React, { useState } from 'react'

import { View, SafeAreaView, Slider, TouchableOpacity, ScrollView, Modal } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Text from '../../components/Text'
import Card from '../../components/Card'
import Header from '../../components/Header'

import { getWeekDays, toTimeString } from '../../helpers/date'

import { Context as UserContext } from '../../providers/User'

export default class DeviceEdit extends React.Component {
    static contextType = UserContext

    state = {
        consumption: 0,
        device: {},
        timeUsage: [{ days: [], from: new Date(), to: new Date() }],
        room: "Quarto",
        showTimePicker: false,
        timePickerOnChange: () => { },
        setTime: (type, t, index) => this.setState(({ timeUsage }) => 
            ({ timeUsage: timeUsage.map((time, i) => index !== i ? time : ({ ...time, [type]: t })) })),
        toggleTimePicker: (timePickerOnChange = () => { }) => this.setState(({ showTimePicker }) => ({ showTimePicker: !showTimePicker, timePickerOnChange })),
        toggleDay: (day, index) => this.setState(({ timeUsage }) => ({
            timeUsage: timeUsage.map((time, i) => {
                if (i !== index)
                    return time

                const { days, ...timeData } = time
                const updatedDays = days.includes(day) ? days.filter(d => d !== day) : [...days, day]

                return { ...timeData, days: updatedDays }
            })
        })),
        addTimeUsage: () => this.setState(({ timeUsage }) =>
            ({ timeUsage: [...timeUsage, { days: [], from: new Date(), to: new Date() }] })),
    }

    componentDidMount() {
        const { navigation } = this.props

        const room = navigation.getParam('room', 'Quarto')

        const device = navigation.getParam('device', {})
        const average = (device.consumption.max + device.consumption.min) / 2

        console.log(device)

        this.setState({ consumption: average, room, device })
    }

    _addDevice = () => {
        this.context.addDevice({ name: this.state.device.name })
        this.props.navigation.state.params.onGoBack()
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props
        const { 
            consumption, timeUsage, addTimeUsage, room, 
            toggleDay, showTimePicker, toggleTimePicker, 
            timePickerOnChange, setTime 
        } = this.state

        const device = navigation.getParam('device', {})

        const TimeUsage = ({ days, from, to, index }) => (
            <View style={{
                flexDirection: 'column',
                marginBottom: 10,
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#e9e9e9'
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around'
                    }}
                >
                    {getWeekDays(1).map((d, i) => (
                        <TouchableOpacity
                            key={i}
                            style={{
                                padding: 10
                            }}
                            onPress={() => { toggleDay(i, index) }}
                        >
                            <Text.Content key={i} color={days.includes(i) ? '#bbb' : '#000'}>{d}</Text.Content>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => toggleTimePicker(date => setTime('from', date, index))}>
                        <Text.Info>
                            Das
                        </Text.Info>
                        <Text.Title>
                            {toTimeString(from)}
                        </Text.Title>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => toggleTimePicker(date => setTime('to', date, index))}>
                        <Text.Info>
                            Às
                        </Text.Info>
                        <Text.Title>
                            {toTimeString(to)}
                        </Text.Title>
                    </TouchableOpacity>
                </View>
            </View>
        )

        const TextValue = ({ name, value }) => (
            <View style={{ marginBottom: 10 }}>
                <Text.Info fontSize={13} color="#8e8e8e">{name}</Text.Info>
                <Text.Title fontSize={18}>{value}</Text.Title>
            </View>
        )

        const TimePickerModal = () => {
            const [pickerDate, setPickerDate] = useState(new Date())

            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showTimePicker}
                >
                    <View
                        style={{
                            padding: 40,
                            marginTop: '80%',
                            height: '100%',
                            borderTopStartRadius: 30,
                            borderTopEndRadius: 30,
                            backgroundColor: '#fff',
                        }}
                    >
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <TouchableOpacity onPress={toggleTimePicker}>
                                <Icon name="close" size={25} />
                            </TouchableOpacity>
                        </View>

                        <DateTimePicker value={pickerDate} mode='time' onChange={(ev, date) => setPickerDate(date)} display="clock" />

                        <TouchableOpacity onPress={() => { 
                            timePickerOnChange(pickerDate)
                            toggleTimePicker()
                        }} style={{ alignSelf: 'center', marginTop: 10 }}>
                            <Text.Title fontSize={20}>OK</Text.Title>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )
        }

        return (
            <SafeAreaView style={{ height: '100%' }}>
                <TimePickerModal />
                <ScrollView>
                    <Header title="Editar dispositivo" goBack={() => navigation.goBack()} full />
                    <Card>
                        <TextValue name="Nome" value={device.name} />
                        <TextValue name="Cômodo" value={room} />
                        <Text.Info fontSize={13} color="#8e8e8e">Consumo mensal (kWh/mês)</Text.Info>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10
                            }}
                        >
                            <Slider
                                style={{ width: '80%' }}
                                minimumValue={device.consumption.min}
                                maximumValue={device.consumption.max}
                                minimumTrackTintColor="#4FB247"
                                maximumTrackTintColor="#B24747"
                                step={5}
                                value={consumption}
                                onSlidingComplete={consumption => { this.setState({ consumption }) }}
                            />
                            <Text.Title fontSize={18}>{consumption.toFixed(1)}</Text.Title>
                        </View>
                        <Text.Info fontSize={13} color="#8e8e8e">Tempo de uso diário estimado</Text.Info>
                        {timeUsage.map(({ days, from, to }, i) => (
                            <TimeUsage key={i} days={days} from={from} to={to} index={i} />
                        ))}
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center'
                            }}
                            onPress={() => addTimeUsage()}
                        >
                            <Icon name="alarm-add" size={25} />
                        </TouchableOpacity>
                    </Card>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this._addDevice}>
                        <Text.Title fontSize={20} color="#fff">Salvar dispositivo</Text.Title>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}