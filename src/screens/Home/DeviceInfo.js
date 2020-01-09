import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DeviceInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.device.name,
  })

  render(){
    const { navigation } = this.props
    const { device } = navigation.state.params

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    })

    return (
      <View style={styles.container}>
        <Text>createdAt: {new Date(device.createdAt).toLocaleDateString()}</Text>
      </View>
    );
  }

}


