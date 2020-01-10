import React from 'react'

import { View, StatusBar, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 10, marginLeft: 10 }}>
        <Icon name="chevron-left" size={35} color='#bababa'/>
    </TouchableOpacity>
)

export default StackNavigatorHeader = ({ previous, navigation }) => (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      {previous ? <BackButton onPress={() => navigation.goBack()}/> : undefined}
    </View>
)