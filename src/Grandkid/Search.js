import React, { Component } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RecipesList from '../Recipe/RecipesList'
import C from '../consts'
import S from './styles'

class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { id: '', type: '' },
      query: '',
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
    this.loadStorage = this.loadStorage.bind(this)
    this.fetchRecipes = this.fetchRecipes.bind(this)
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
    const URL = C.API + '/grandkidSearching/0&20'
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grandkidID: this.state.user.id,
        searchText: this.state.query
      })
    }
    let recipes = []
    try {
      const response = await fetch(URL, options)
      const responseJSON = await response.json()
      if (!response.ok) {
        this.setState({ fetchError: { displayError: true, message: responseJSON.message } })
        return
      }
      recipes = [...responseJSON.recipesWithOwner]
    } catch (error) {
      this.setState({ fetchError: { displayError: true, message: error } })
    }
    this.setState({ fetched: recipes.length > 0, recipes: [...recipes] })
  }
  async componentDidMount() {
    await this.loadStorage()
  }
  render() {
    return (
      <View style={S.container}>
        {this.state.asyncError.displayError && (
          <View style={S.containerProfile}>
            <Text>Async Storage .getItem() error: {this.state.asyncError.message}</Text>
          </View>
        )}
        <View style={S.containerButtons}>
          <View style={S.formInputContainer}>
            <TextInput
              style={S.formInput}
              onChangeText={query => this.setState({ query })}
              autoCapitalize={'none'}
              keyboardType="default"
              placeholder={'חפש כאבים ואו מרכיבים'}
            />
          </View>
          <View>
            <Button title="חיפוש" color="#61892F" onPress={this.fetchRecipes} />
          </View>
        </View>
        <View style={S.containerList}>
          <Text>המתכונים שלך:</Text>
          {this.state.fetched && (
            <RecipesList
              recipes={this.state.recipes.map(recipeWithOwner => recipeWithOwner.recipe)}
            />
          )}
        </View>
      </View>
    )
  }
}
export default MyProfile
