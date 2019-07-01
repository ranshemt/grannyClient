/* eslint-disable react/prop-types */
import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
//
import MyProfile from '../MutualProfile/MyProfile'
import CreateRecipe from '../Granny/CreateRecipe'
//
const AppGranny = createMaterialBottomTabNavigator(
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
    CreateRecipe: {
      screen: CreateRecipe,
      navigationOptions: {
        tabBarLabel: '+Recipe',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'plus'} />
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
export default AppGranny
