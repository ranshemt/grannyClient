/* eslint-disable react/prop-types */
import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MyProfile from '../MutualProfile/MyProfile'
import Search from '../Grandkid/Search'
const AppGrandkid = createMaterialBottomTabNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        tabBarLabel: 'Me',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
          </View>
        )
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'search'} />
          </View>
        )
      }
    }
  },
  {
    initialRouteName: 'MyProfile',
    activeColor: '#ffffff',
    inactiveColor: '#222629',
    barStyle: { backgroundColor: '#61892f' }
  }
)
export default AppGrandkid
