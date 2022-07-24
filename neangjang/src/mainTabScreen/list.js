// [ 식재료 리스트화면 Stack Navigator ]
import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import MainList from './listScreens/mainList';
import AddList from './listScreens/addList';

const Stack = createNativeStackNavigator();

const List = () => {
  return (
    <Stack.Navigator initialRouteName="MainList">
      <Stack.Screen
        name="MainList"
        component={MainList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddList"
        component={AddList}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

export default List;