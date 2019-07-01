/* eslint-disable no-prototype-builtins */
import React, { Component } from 'react'
import { Text, View, Button, TextInput, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import C from '../consts'
const S = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  executeButton: {
    width: '50%',
    marginTop: 40,
    alignSelf: 'center'
  },
  formInputContainer: {
    marginTop: 20,
    marginRight: 20,
    width: '80%'
  },
  formInput: {
    height: 40,
    borderColor: '#61892F',
    borderWidth: 2
  }
})
class CreateRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { id: '', type: '' },
      lastRecipe: '',
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
    this.addRecipe = this.addRecipe.bind(this)
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
  async addRecipe() {
    const URL = C.API + '/createRecipe/' + this.state.user.id
    const recipeObj = {}
    let missingParameterFlag = false
    if (this.state.hasOwnProperty('title')) {
      recipeObj.title = this.state.title
    } else {
      missingParameterFlag = true
    }
    if (this.state.hasOwnProperty('preptime')) {
      recipeObj.preptime = this.state.preptime
    } else {
      missingParameterFlag = true
    }
    if (this.state.hasOwnProperty('description')) {
      recipeObj.description = this.state.description
    } else {
      missingParameterFlag = true
    }
    if (this.state.hasOwnProperty('pains')) {
      recipeObj.pains = this.state.pains
    } else {
      missingParameterFlag = true
    }
    if (this.state.hasOwnProperty('ingredients')) {
      recipeObj.ingredients = this.state.ingredients
    } else {
      missingParameterFlag = true
    }
    if (missingParameterFlag) {
      this.setState({ fetchError: { displayError: true, message: 'missing parameter' } })
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeObj)
    }
    let lastRecipe = ''
    try {
      const response = await fetch(URL, options)
      const responseJSON = await response.json()
      if (!response.ok) {
        this.setState({ fetchError: { displayError: true, message: responseJSON.message } })
        return
      }
      lastRecipe = `id: ${responseJSON._id}\ntitle: ${responseJSON.title}`
    } catch (error) {
      this.setState({ fetchError: { displayError: true, message: error } })
    }
    this.setState({
      fetchError: { displayError: false, message: '' },
      lastRecipe,
      title: undefined,
      preptime: undefined,
      description: undefined,
      pains: undefined,
      ingredients: undefined
    })
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
        {this.state.fetchError.displayError && <Text>{this.state.fetchError.message}</Text>}
        <View style={S.formInputContainer}>
          <TextInput
            style={S.formInput}
            onChangeText={title => this.setState({ title })}
            autoCapitalize={'none'}
            keyboardType="default"
            placeholder={'כותרת'}
          />
        </View>
        <View style={S.formInputContainer}>
          <TextInput
            style={S.formInput}
            onChangeText={preptime => this.setState({ preptime })}
            autoCapitalize={'none'}
            keyboardType="number-pad"
            placeholder={'זמן הכנה'}
          />
        </View>
        <View style={S.formInputContainer}>
          <TextInput
            style={S.formInput}
            onChangeText={ingredients => this.setState({ ingredients })}
            autoCapitalize={'none'}
            keyboardType="default"
            placeholder={'מרכיבים'}
          />
        </View>
        <View style={S.formInputContainer}>
          <TextInput
            style={S.formInput}
            onChangeText={pains => this.setState({ pains })}
            autoCapitalize={'none'}
            keyboardType="default"
            placeholder={'כאבים'}
          />
        </View>
        <View style={S.formInputContainer}>
          <TextInput
            style={S.formInput}
            onChangeText={description => this.setState({ description })}
            autoCapitalize={'none'}
            keyboardType="default"
            placeholder={'תיאור'}
          />
        </View>
        <View style={S.executeButton}>
          <Button title="לחץ עליי להוספה" color="#61892F" onPress={this.addRecipe} />
        </View>
        <Text>מתכון אחרון שהוספת</Text>
        <Text>{this.state.lastRecipe}</Text>
      </View>
    )
  }
}
export default CreateRecipe
