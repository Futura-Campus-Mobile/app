import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LabelInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.label.name,
  })

  render(){
    const { navigation } = this.props
    const { label } = navigation.state.params

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
        <Text>createdAt: {new Date(label.createdAt).toLocaleDateString()}</Text>
      </View>
    );
  }

}


