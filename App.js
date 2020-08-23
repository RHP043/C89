import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WelcomeScreen from './screens/WelcomeScreen';
import BookRequestScreen from './screens/BookRequestScreen';
import BookDonateScreen from './screens/BookDonateScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator,drawerItems} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppTabNavigator} from './components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator'

export default function App() {
  return (
    <AppContainer/>
  );
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator},
  BottomTab:{screen:AppTabNavigator}
})
const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
