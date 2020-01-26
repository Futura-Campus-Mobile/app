import React from 'react'

export const Context = React.createContext()

export class Provider extends React.Component {
    state = {
        uid: "123",
        name: "Pedro",
        email: "pedro@teste.com",
        password: "25414540709124050347d150085a22caa79b15b23da75c4f1c4626bad493664d",
        devices: [
            {
                "id": 0,
                "name": "Ar condicionado",
                "createdAt": 1578400358797,
                "room": "Quarto",
                "color": "#F3A40C",
                "icon": "air-filter",
                "comsumption": [
                    {
                        time: { start: '24/01/20 às 8h', end: '24/01/20 às 9h' },
                        kw: 12
                    },
                    {
                        time: { start: '24/01/20 às 9h' },
                        kw: 15
                    }
                ]
            },
            {
                "id": 1,
                "name": "Forno elétrico",
                "icon": "toaster-oven",
                "createdAt": 1578400358797,
                "room": "Cozinha",
                "color": "#1AA5B8"
            },
            {
                "id": 2,
                "name": "Micro-ondas",
                "icon": "microwave",
                "color": "#FF705E",
                "room": "Cozinha",
                "createdAt": 1578400358920
            },
            {
                "id": 3,
                "name": "Geladeira",
                "icon": "fridge",
                "color": "#FF705E",
                "room": "Cozinha",
                "createdAt": 1578400358920
            }
        ],
        plugs: [],
        connectedPlugs: {},
        connectPlug: (plugId, deviceId) => {
            const { connectedPlugs } = this.state

            Object.entries(connectedPlugs).forEach(([plug, device]) => {
                if(deviceId == device) connectedPlugs[plug] = undefined 
            })

            this.setState({ connectedPlugs: { ...connectedPlugs, [plugId]: deviceId }})
        },
        deviceIsConnected: deviceId => {
            const entry = Object.entries(this.state.connectedPlugs)
                .find(([_, device]) => device == deviceId)

            if(entry) return entry[0]
        },
        plugIsConnected: plugId => this.state.connectedPlugs[plugId],
        getDevicesByRoom: () => {
            const { devices } = this.state
            const rooms = {}

            devices.forEach(device => rooms[device.room] =
                (!rooms[device.room] ? [device] : [...rooms[device.room], device]))

            return Object.keys(rooms).map(roomName =>
                ({ name: roomName, devices: rooms[roomName] }))
        },
        addDevice: ({
            id = Math.random().toString(16).slice(2),
            name = 'Outro', color = '#FF705E',
            room = 'Quarto'
        }) => {
            const device = {
                id, name, createAt: Date.now(),
                color, room
            }

            this.setState(state => ({ devices: [...state.devices, device] }))
        },
        setDevices: devices => {
            this.setState({ devices: [] })
            devices.forEach(device => this.state.addDevice(device))
        },
        addPlug: () => {
            const plug = {
                "id": "" + this.state.plugs.length,
                "model": "f1.0",
                "currentDevice": "0",
                "isOn": true
            }

            this.setState({ plugs: [...this.state.plugs, plug] })
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