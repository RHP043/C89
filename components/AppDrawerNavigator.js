import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import firebase from 'firebase';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSidebarMenu';
import SettingScreen from '../screens/SettingScreen'
import MyDonationScreen from '../screens/MyDonationScreen';
import MyRecievedBooksScreen from '../screens/MyRecievedBooksScreen'
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Notifications:{screen:NotificationScreen},
    MyDonations:{screen:MyDonationScreen},
    MyRecievedBooks:{screen:MyRecievedBooksScreen},
    Setting:{screen:SettingScreen},
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
})
