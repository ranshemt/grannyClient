import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerProfile: {
    flex: 2,
    flexDirection: 'row'
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  containerList: {
    flex: 7
  },
  avatarContainer: {
    flex: 4
  },
  avatar: {
    margin: 5
  },
  infoContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  email: {
    fontWeight: 'normal'
  }
})
export default styles
