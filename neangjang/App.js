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
import Join from './src/join';
import Main from './src/mainTabScreen/mainTab';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TitleScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 40}}>냉장냉장</Text>
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

// function JoinScreen({navigation}) {
//   return (
//     <View>
//       <Text>Join Screen</Text>
//     </View>
//   );
// }

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
        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen
          name="MainTab"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
