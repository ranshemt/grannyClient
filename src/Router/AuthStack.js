import { createStackNavigator } from 'react-navigation'
import Welcome from '../AuthStack/Welcome'
import SignIn from '../AuthStack/SignIn'
const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      // eslint-disable-next-line no-unused-vars
      navigationOptions: ({ navigation }) => ({
        title: 'אפליקציית תרופות סבתא'
      })
    },
    SignIn: {
      screen: SignIn,
      // eslint-disable-next-line no-unused-vars
      navigationOptions: ({ navigation }) => ({
        title: 'התחברות'
      })
    }
  },
  {
    initialRouteName: 'Welcome'
  }
)
export default AuthStack
