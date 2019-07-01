import React from 'react'
import { View, Button } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import styles from './styles'
const Welcome = props => {
  return (
    <View style={styles.containerWelcome}>
      <View style={styles.decisionButtonContainer}>
        <Button
          onPress={() => props.navigation.navigate('SignIn')}
          title="התחברות"
          color="#61892F"
        />
      </View>
    </View>
  )
}
Welcome.propTypes = {
  navigation: PropTypes.object.isRequired
}
export default withNavigation(Welcome)
