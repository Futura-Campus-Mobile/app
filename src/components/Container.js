import React from 'react'
import { View } from 'react-native'

export default Container = ({ children }) => (
  <View style={{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  }}>
    {children}
  </View>
)
