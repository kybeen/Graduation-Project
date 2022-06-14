/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SectionList,
  SafeAreaView,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Home from './home';
import List from './list';
import Recipe from './recipe';
import Calendar from './calendar';
import Setting from './setting';

const Tab = createBottomTabNavigator();
export const MainTabContext = createContext();

const Main = ({navigation, route}) => {
  return (
    <MainTabContext.Provider value={{id: route.params.id, name: route.params.name}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName
            

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'List') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Recipe') {
              iconName = focused ? 'ios-book' : 'ios-book-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Recipe" component={Recipe} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    </MainTabContext.Provider>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  mainView: {
    flex: 10,
    backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 0,
    width: '95%',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Main;
