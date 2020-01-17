import React from 'react'

import { View, Text, Button } from 'react-native'

import { Context as UserContext } from '../../providers/User'

export default class PlugEdit extends React.Component {
    static contextType = UserContext
    
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state

        const title = (params && params.plug) ? `Editando ${params.plug.model}` : 'Novo aparelho Futura'

        return {
            title
        }
    }

    render(){
        const _addPlug = () => {
            this.context.addPlug()
            this.props.navigation.goBack()
        }

        return (
            <View>
                <Text>Plug info</Text>
                <Button title="Add plug" onPress={_addPlug}/>
            </View>
        )
    }
}