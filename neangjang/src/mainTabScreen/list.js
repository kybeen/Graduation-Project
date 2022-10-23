// [ 식재료 리스트화면 Stack Navigator ]
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import MainList from './listScreens/mainList';
import FoodInfo from './listScreens/foodInfo';
import FoodInfoModify from './listScreens/foodInfoModify';
import AddList from './listScreens/addList';
import Scanner from './listScreens/scanner';

const Stack = createNativeStackNavigator();

const List = () => {
  return (
    <Stack.Navigator initialRouteName="MainList">
      <Stack.Screen
        name="MainList" // 전체 식재료 리스트 화면
        component={MainList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodInfo" // 식재료 정보 화면
        component={FoodInfo}
        options={{ title: '식재료 정보' }}
      />
      <Stack.Screen
        name="FoodInfoModify" // 식재료 정보 수정 화면
        component={FoodInfoModify}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="AddList" // 식재료 추가 화면
        component={AddList}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Scanner" // 식재료 추가 시 바코드 스캐너
        component={Scanner}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

export default List;