import React from 'react'

export default UserContext = React.createContext()

export class UserProvider extends React.Component {
    state = {
        name: "Pedro",
        email: "pedro@teste.com",
        password: "25414540709124050347d150085a22caa79b15b23da75c4f1c4626bad493664d",
        devices: 
        [{
            "id": 0,
            "name": "Ar condicionado",
            "createdAt": 1578400358797,
            "color": "#F3A40C"
        },
        {
            "id": 1,
            "name": "Forno elétrico",
            "createdAt": 1578400358797,
            "color": "#1AA5B8"
        },
        {
            "id": 2,
            "name": "Microondas",
            "color":"#FF705E",
            "createdAt": 1578400358920
        }
    ],
        plugs: [],
        addDevice: () => {
            const device = {
                "id": "" + this.state.devices.length,
                "name": "New device " + this.state.devices.length,
                "createdAt": 1578400358797,
                "color": "#FF705E"
            }

            this.setState({ devices: [...this.state.devices, device] })
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
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}