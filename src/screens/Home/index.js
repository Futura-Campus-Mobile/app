import HomeScreen from './Home'
import ProfileScreen from './Profile'
import OverviewScreen from './Overview'
import DeviceInfoScreen from './DeviceInfo'
import DeviceEditScreen from './DeviceEdit'
import PlugEditScreen from './PlugEdit'

import { createStackNavigator } from 'react-navigation-stack'

export default createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Overview: OverviewScreen,
    DeviceInfo: DeviceInfoScreen,
    PlugEdit: PlugEditScreen,
    DeviceEdit: DeviceEditScreen,
  },
  {
    initialRouteName: 'Home'
  }
)