/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

//store
import store from './store/index';

//Splash Screen
import SplashScreen from './pages/splashScreen/SplashScreen';

//Create account Screen
import CreateAccount from './pages/createAccount/CreateAccount';

//Home
import Home from './pages/home/Home';

//Card
import EventDetails from './pages/event/EventDetails';

//Sell product
import Ad from './pages/adPage/Ad';

//Disable Yellow Warnings
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);

const AppStack = createStackNavigator(
  {
    SplashScreen,
    CreateAccount,
    Ad,
    Home,
    EventDetails
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none'
  }
);

const RootStack = createAppContainer(AppStack);
