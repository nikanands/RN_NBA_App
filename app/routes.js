import React from 'react';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

// Screens
import News from './components/news';
import Login from './components/login';
import Games from './components/games';
import NewsArticle from './components/news/NewsArticle';
import GameArticle from './components/games/GameArticle';
import Logo from './assets/images/nba_login_logo.png';

//Logo
const HeaderLogo = <Image
    source={Logo}
    resizeMode="contain"
    style={{
      width: 70,
      height: 35,
    }}
  />

//HEADER STYLE AND DETAILS
const mainHeader = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#001338',
    },
    headerTintColor: 'white',
    headerTitle: HeaderLogo,
  },
};

//NEWS NAVIGATION AND COMPONENT
const NewsStack = createStackNavigator(
  {
    News: News,
    NewsArticle: NewsArticle,
  },
  mainHeader,
);

//GAMES NAVIGATION AND COMPONENT
const GameStack = createStackNavigator(
  {
    Games: Games,
    GameArticle: GameArticle,
  },
  mainHeader,
);

//MAIN BOTTOM NAVIGATION
const AppStack = createBottomTabNavigator(
  {
    News: NewsStack,
    Games: GameStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#FFF',
      showLabel: false,
      activeBackgroundColor: '#00194B',
      inactiveBackgroundColor: '#001338',
      style: {
        backgroundColor: '#001338',
      },
    },
    initialRouteName: 'News',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizotal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;

        if (routeName === 'News') {
          iconName = 'ios-basketball';
        } else if (routeName === 'Games') {
          iconName = 'md-tv';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

//LOGIN NAVIGATION AND COMPONENT
const LoginStack = createStackNavigator(
  {
    Login: Login,
  },
  {
    headerMode: 'none',
  },
);

//MAIN APP
const rootRouter = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Login: LoginStack,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default rootRouter;
