import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Avatar } from 'react-native-paper'
import PropType from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import RecipesList from '../Recipe/RecipesList'
import C from '../consts'
import S from './styles'

class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { id: '', type: '', name: 'Ab' },
      fetched: false,
      recipes: [],
      asyncError: {
        displayError: false,
        message: ''
      },
      fetchError: {
        displayError: false,
        message: ''
      }
    }
    this.logout = this.logout.bind(this)
    this.loadStorage = this.loadStorage.bind(this)
    this.fetchRecipes = this.fetchRecipes.bind(this)
  }
  async logout() {
    try {
      await AsyncStorage.removeItem(C.AsyncStorageKey)
    } catch (error) {
      this.setState({ asyncError: { displayError: true, message: error } })
    }
    this.props.navigation.navigate('AuthStack')
  }
  async loadStorage() {
    let userInfo = null
    try {
      const userInfoStr = await AsyncStorage.getItem(C.AsyncStorageKey)
      userInfo = JSON.parse(userInfoStr)
    } catch (error) {
      this.setState({ asyncError: { displayError: true, message: error } })
    }
    this.setState({
      asyncError: { displayError: false, message: '' },
      user: { ...userInfo }
    })
  }
  async fetchRecipes() {
    let URL = ''
    if (this.state.user.type == 'grandkid') URL = C.API + '/grandkidFullData/' + this.state.user.id
    if (this.state.user.type == 'granny') URL = C.API + '/getAllGrannyRecipes/' + this.state.user.id
    let recipes = []
    try {
      const response = await fetch(URL)
      const responseJSON = await response.json()
      if (!response.ok) {
        this.setState({ fetchError: { displayError: true, message: responseJSON.message } })
        return
      }
      recipes = [...responseJSON.recipes]
    } catch (error) {
      this.setState({ fetchError: { displayError: true, message: error } })
    }
    this.setState({ fetched: recipes.length > 0, recipes: [...recipes] })
  }
  async componentDidMount() {
    await this.loadStorage()
    await this.fetchRecipes()
  }
  render() {
    return (
      <View style={S.container}>
        {this.state.asyncError.displayError && (
          <View style={S.containerProfile}>
            <Text>Async Storage .getItem() error: {this.state.asyncError.message}</Text>
          </View>
        )}
        <View style={S.containerProfile}>
          <View style={S.avatarContainer}>
            <Avatar.Text label={`${this.state.user.name}`} style={S.avatar} size={100} />
          </View>
          <View style={S.infoContainer}>
            <Text style={S.name}>{this.state.user.name}</Text>
            <Text style={S.email}>{this.state.user.email}</Text>
          </View>
        </View>
        <View style={S.containerButtons}>
          <View>
            <Button title="התנתקות" color="#61892F" onPress={this.logout} />
          </View>
          <View>
            <Button title="טעינת מתכונים" color="#61892F" onPress={this.fetchRecipes} />
          </View>
        </View>
        <View style={S.containerList}>
          <Text>המתכונים שלך:</Text>
          {this.state.fetched && <RecipesList recipes={this.state.recipes} />}
        </View>
      </View>
    )
  }
}
MyProfile.propTypes = {
  navigation: PropType.object.isRequired
}
export default withNavigation(MyProfile)
