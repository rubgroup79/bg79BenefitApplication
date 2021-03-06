import React from 'react';
import { registerRootComponent, AppLoading, Asset, Font } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems} from 'react-navigation';

import Login from "./src/views/login/login";
import SignIn1 from "./src/views/login/signIn1";
import Components from './src/drawer/components';
import Ratings from './src/drawer/ratings';
import Pricing from './src/drawer/pricing';
import SigninTrainee from './src/views/login/signinTrainee';
import SigninTrainer from './src/views/login/signinTrainer';
import Profile from './src/drawer/profile';
import Lists from './src/drawer/lists';
import ListTest from './src/Components/ListTest';
import ListsScreen1 from './src/views/lists/screen1'
import Settings from './src/drawer/settings';
import HomeTrainee from './src/Pages/HomeTrainee';
import HomeTrainer from './src/Pages/HomeTrainer';
import TraineeProfile from './src/Pages/TraineeProfile';
import CreateGroup from './src/Pages/createGroup';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('./src/images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);


const MainRoot = DrawerNavigator(
  {
    HomeTrainee: {
      path: '/homeTrainee',
      screen: HomeTrainee,
      // navigationOptions: {
      //   drawerLabel:()=>null
      // }
    },
    HomeTrainer: {
      path: '/homeTrainer',
      screen: HomeTrainer,
      // navigationOptions: {
      //   drawerLabel:()=>null
      // }
    },
    CreateGroup: {
      path: '/createGroup',
      screen: CreateGroup,
      // navigationOptions: {
      //   drawerLabel:()=>null
      // }
    },
    SignIn1: {
      path: '/signIn1',
      screen: SignIn1,
      // navigationOptions: {
      //   drawerLabel:()=>null
      // }
    },
    SigninTrainee: {
      path: '/signinTrainee',
      screen: SigninTrainee,
      // navigationOptions: {
      //   drawerLabel:()=>null
      // }
    },
    SigninTrainer: {
      path: '/signinTrainer',
      screen: SigninTrainer,
      // navigationOptions: {
      //   drawerLabel:()=>null
      // }
    },
    Login: {
      path: '/login',
      screen: Login,
    },
    TraineeProfile: {
      path: '/traineeProfile',
      screen: TraineeProfile,
    },
    Lists: {
      path: '/lists',
      screen: Lists,
    },
    Profile: {
      path: '/profile',
      screen: Profile,
    },
    Components: {
      path: '/components',
      screen: Components,
    },
    Ratings: {
      path: '/ratings',
      screen: Ratings,
    },
    Pricing: {
      path: '/pricing',
      screen: Pricing,
    },
    Settings: {
      path: '/settings',
      screen: Settings,
    },
  },
  {
    initialRouteName: 'HomeTrainee',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {
  state = {
    isReady: false,
  };


  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/bg_screen1.jpg'),
      require('./assets/images/bg_screen2.jpg'),
      require('./assets/images/bg_screen3.jpg'),
      require('./assets/images/bg_screen4.jpg'),
      require('./assets/images/user-cool.png'),
      require('./assets/images/user-hp.png'),
      require('./assets/images/user-student.png'),
      require('./assets/images/avatar1.jpg'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return (<MainRoot />)

  }
}
registerRootComponent(AppContainer);