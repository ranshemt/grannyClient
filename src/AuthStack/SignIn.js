import React, { Component } from 'react'
import { Button, View, TextInput, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import C from '../consts'
import styles from './styles'
class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'grandkid',
      email: '',
      password: '',
      displayError: false,
      error: { statusCode: -1, message: 'no error' }
    }
    this.onLogin = this.onLogin.bind(this)
  }
  async onLogin() {
    if (this.state.type != 'grandkid' && this.state.type != 'granny') {
      this.setState({
        displayError: true,
        error: { statusCode: 404, message: 'סוג משתמש לא תקין' }
      })
      return
    }
    if (this.state.error.statusCode === -1) {
      this.setState({ displayError: false })
    }
    let responseJSON
    try {
      const URL = C.API + '/signIn/' + this.state.type
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      }
      const response = await fetch(URL, options)
      responseJSON = await response.json()
      if (!response.ok) {
        this.setState({ displayError: true, error: { ...responseJSON } })
        return
      }
    } catch (error) {
      this.setState({ displayError: true, error })
    }
    try {
      const setUserObj = {
        type: this.state.type,
        id: responseJSON.model._id,
        email: responseJSON.model.email,
        name: responseJSON.model.name,
        nick: responseJSON.model.nick,
        image: responseJSON.model.image
      }
      await AsyncStorage.setItem(C.AsyncStorageKey, JSON.stringify(setUserObj))
    } catch (error) {
      this.setState({
        displayError: true,
        error: { statusCode: 500, message: `AsyncStorage ERROR: ${error.message}` }
      })
    }
    this.props.navigation.navigate('LoadScreen')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formInputContainer}>
          <Text>סוג משתמש אפשרי: granny / grandkid</Text>
          <TextInput
            style={styles.formInput}
            onChangeText={type => this.setState({ type })}
            keyboardType="default"
            autoCapitalize={'none'}
            defaultValue={'grandkid'}
          />
        </View>
        <View style={styles.formInputContainer}>
          <TextInput
            style={styles.formInput}
            onChangeText={email => this.setState({ email })}
            autoCapitalize={'none'}
            keyboardType="email-address"
            autoCompleteType={'email'}
            placeholder={'אי מייל'}
          />
        </View>
        <View style={styles.formInputContainer}>
          <TextInput
            style={styles.formInput}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
            autoCapitalize={'none'}
            keyboardType="default"
            autoCompleteType={'password'}
            placeholder={'סיסמה'}
          />
        </View>
        <View style={styles.executeButton}>
          <Button title="לחץ עליי להמשך" color="#61892F" onPress={this.onLogin} />
        </View>
        <Text>{this.state.displayError && <Text>{this.state.error.message}</Text>}</Text>
      </View>
    )
  }
}
SignIn.propTypes = {
  navigation: PropTypes.object.isRequired
}
export default withNavigation(SignIn)
