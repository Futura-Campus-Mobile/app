import React from 'react'

export const Context = React.createContext()

export class Provider extends React.Component {
    state = {
        defaultDevices: [],
        defaultRoomNames: [],
        getDefaultDevicesByRoom: room => this.state.defaultDevices.filter(devices => devices.defaultRoomNames.includes(room)),
    }

    componentDidMount(){
        const defaultDevices = [
            {
                name: 'Geladeira',
                icon: 'fridge',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Cozinha'],
                defaultUseTime: [
                    { 
                        from: new Date(), to: new Date(),
                        days: [0, 2, 4]
                    }
                ]
            },
            {
                name: 'TV',
                icon: 'youtube-tv',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Sala', 'Quarto'],
                defaultUseTime: []
            },
            {
                name: 'Carregador',
                icon: 'battery-charging-80',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Quarto', 'Banheiro'],
                defaultUseTime: []
            },
            {
                name: 'Máquina de lavar',
                icon: 'stove',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Área de serviço'],
                defaultUseTime: []
            }
        ]

        const getUniqueValues = (array) => [...(new Set(array))]

        const defaultRoomNames = getUniqueValues(defaultDevices.reduce((rooms, device) => [...rooms, ...device.defaultRoomNames], []))

        this.setState({ defaultRoomNames, defaultDevices })
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}