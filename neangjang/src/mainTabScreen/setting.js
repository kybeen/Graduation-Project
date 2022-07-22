// [ 세팅화면 Stack Navigator ]
import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicon from 'react-native-vector-icons/Ionicons';

import UserSetting from './settingScreens/userSetting';
import MainSetting from './settingScreens/mainSetting';
import NoticeSetting from './settingScreens/noticeSetting';
import DisplaySetting from './settingScreens/diaplaySetting';

const Stack = createNativeStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator initialRouteName="MainSetting">
      <Stack.Screen
        name="MainSetting"
        component={MainSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserSetting"
        component={UserSetting}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="NoticeSetting"
        component={NoticeSetting}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="DisplaySetting"
        component={DisplaySetting}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Settings;