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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Login from './src/login';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TitleScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 40}}>Main Title!!!!</Text>
      <Button title="To Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

// function LoginScreen({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
//       <Login />
//     </View>
//   )
// }

function JoinScreen({navigation}) {
  return (
    <View>
      <Text>Join Screen</Text>
    </View>
  );
}

function MainTabScreen({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

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
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

function MainScreen() {
  return (
    <View>
      <Text>Main Screen</Text>
    </View>
  );
}

function ListScreen() {
  return (
    <View>
      <Text>List Screen</Text>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View>
      <Text>Recipe Screen</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View>
      <Text>Calendar Screen</Text>
    </View>
  );
}

function SettingScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Join" component={JoinScreen} />
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
