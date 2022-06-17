/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';

import TitleScreen from './src/startScreens/title';
import LoginScreen from './src/startScreens/login';
import JoinScreen from './src/startScreens/join';

import MainTabScreen from './src/mainTabScreen/mainTab';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  console.disableYellowBox = true; 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Join"
          component={JoinScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTabScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
