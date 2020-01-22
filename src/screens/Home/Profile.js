import React from 'react'

import { Text, View, Image, StyleSheet } from 'react-native'
import UserContext from '../../providers/User'

const AllContainers = ({ text }) => (
  <View style={styles.items}>
    <Text>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  containerUser: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 10,
  },

  containerItems: {
    paddingHorizontal: 40,
  },

  name: {
    fontSize: 20,
    paddingTop: 20,
  },

  email: {
    fontSize: 15,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FFF',
  },

  items: {
    width: 140,
    height: 100,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10,
    marginTop: 40,
  },
})

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Perfil'
  }

  static contextType = UserContext

  render(){
    const { navigation } = this.props
    const user = this.context
    
    return (
      <>
      <View style={styles.containerUser}>
        <Image 
          style={styles.avatar} 
          //source={{uri: user.avatar_url}} 
          source={{uri: 'https://cdn.dicionariopopular.com/imagens/pagar-o-pato-og.jpg'}} 
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.containerItems}>
          <View style={{flexDirection:"row",flexWrap:"wrap", justifyContent:"space-around"}}> 
            <AllContainers text={`${user.plugs.length} dispositivos futura`}/>
            <AllContainers text="Test02" />
            <AllContainers text="Test03" />
            <AllContainers text="Test04" />
          </View>
      </View>
      </>
    );
  }
}