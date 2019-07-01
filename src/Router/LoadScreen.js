import React from 'react'
import { ActivityIndicator, StatusBar, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import C from '../consts'
class LoadScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  async getUserInfo() {
    let userInfo = null
    try {
      const userInfoStr = await AsyncStorage.getItem(C.AsyncStorageKey)
      userInfo = JSON.parse(userInfoStr)
    } catch (error) {
      this.setState({ error })
    }
    if (userInfo === null) this.props.navigation.navigate('AuthStack')
    if (userInfo.type == 'granny') {
      this.props.navigation.navigate('AppGranny', { userInfo })
    }
    if (userInfo.type == 'grandkid') {
      this.props.navigation.navigate('AppGrandKid', { userInfo })
    }
  }
  async componentDidMount() {
    await this.getUserInfo()
  }
  render() {
    return (
      <View>
        <Text>Loading Screen</Text>
        {!this.state.error && <ActivityIndicator />}
        {this.state.error && <Text>ERROR: {this.state.error}</Text>}
        <StatusBar barStyle="default" />
      </View>
    )
  }
}
LoadScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
export default LoadScreen
