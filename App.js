import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import { SplashScreen } from './views/SplashScreen'
import { Login } from './views/Login/Login'
import { Home } from './views/Home/Home'
import { NewsDetail } from './views/News/NewsDetail'
import { ShopDetail } from './views/Shop/ShopDetail'

const HomeNavigation = createStackNavigator({
  Home: { 
      screen: Home,
      navigationOptions: {
          header: null
      }
  },
  NewsDetail: { 
      screen: NewsDetail,
      navigationOptions: {
          title: 'รายละเอียด',
          headerTintColor: '#f3f3f3',
          headerTitleStyle: {
              fontSize: 18,
              fontFamily: 'Kanit-Regular',
              color: '#f3f3f3'
          },
          headerStyle: {
              backgroundColor: '#D26047',
          },
      }
  },
  ShopDetail: { 
      screen: ShopDetail, 
      navigationOptions: {
          title: 'รายละเอียด',
          headerTintColor: '#f3f3f3',
          headerTitleStyle: {
              fontSize: 18,
              fontWeight: '400',
              fontFamily: 'Kanit-Regular',
              color: '#f3f3f3'
          },
          headerStyle: {
              backgroundColor: '#D26047',
          },
      }
  },
}, {
  initialRouteParams: 'Home',
});

const Navigation = createSwitchNavigator({
  SplashScreen: SplashScreen,
  Login: Login,
  Home: HomeNavigation,
})
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
const App = createAppContainer(Navigation);

export default App;