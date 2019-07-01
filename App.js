import { createSwitchNavigator, createAppContainer } from 'react-navigation'
//
import LoadScreen from './src/Router/LoadScreen'
import AuthStack from './src/Router/AuthStack'
import AppGranny from './src/Router/AppGranny'
import AppGrandKid from './src/Router/AppGrandkid'
//
const App = createAppContainer(
  createSwitchNavigator(
    {
      LoadScreen,
      AuthStack,
      AppGranny,
      AppGrandKid
    },
    {
      initialRouteName: 'LoadScreen'
    }
  )
)
export default App
