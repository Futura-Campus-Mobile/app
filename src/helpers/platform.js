import React from 'react'
import { Platform } from 'react-native'

import { Linking } from 'expo'
import * as IntentLauncher from 'expo-intent-launcher'

export const openWifiSettings = () => (
    (Platform.OS === 'android') ? 
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_WIFI_SETTINGS)
    :
        Linking.openURL('App-Prefs:root=WIFI')
)