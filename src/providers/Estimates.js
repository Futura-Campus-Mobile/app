import React from 'react'

export const Context = React.createContext()

export class Provider extends React.Component {
    state = {
        defaultDevices: [],
        defaultRoomNames: [],
        getDefaultDevicesByRoom: room => this.state.defaultDevices.filter(devices => devices.defaultRoomNames.includes(room)),
        // retorna um valor de 1 a 5 (A a E)
        getComsumptionByLevel: ({ max, min }, level) => (min + (max-min)*(level-1)/4)
    }

    componentDidMount(){
        const defaultDevices = [
            {
                name: 'Geladeira',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Cozinha'],
                defaultUseTime: [
                    { 
                        from: 0, to: 24*60, // intervalo do dia em minutos (dia inteiro)
                        days: [0, 2, 4] // dias da semana de 0 a 6
                    }
                ]
            },
            {
                name: 'TV',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Sala', 'Quarto'],
                defaultUseTime: []
            },
            {
                name: 'Carregador',
                consumption: { max: 40, min: 10 },
                defaultRoomNames: ['Quarto', 'Banheiro'],
                defaultUseTime: []
            },
            {
                name: 'Máquina de lavar',
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