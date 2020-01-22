import React from 'react'

import { TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native'

import { Context as UserContext } from '../providers/User'

import TextInput from '../components/TextInput'
import Text from '../components/Text'

export default class SignIn extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding">
          <UserContext.Consumer>
            {({ devices }) => {
              const userHaveDevices = devices.length !== 0

              return (
                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%' }}>
                  <TextInput placeholder='E-mail' keyboardType='email-address' autoCompleteType='email'/>
                  <TextInput placeholder='Senha' keyboardType='visible-password' autoCorrect={false} secureTextEntry/>

                  <TouchableOpacity 
                    style={{ flexDirection: 'row', justifyContent: 'center', padding: 20 }}
                    onPress={
                      () => navigation.navigate(userHaveDevices ? 'Home' : 'MyHome')
                    }
                  >
                    <Text.Content>Entrar</Text.Content>
                  </TouchableOpacity>
                </View>
              )
            }}

          </UserContext.Consumer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}