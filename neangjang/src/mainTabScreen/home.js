// [  홈 화면 Stack Navigator ]
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import MainHome from './homeScreens/mainHome';
import FoodInfo from './listScreens/foodInfo';
import RecipeInfo from './recipeScreens/recipeInfo';

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="MainHome">
      <Stack.Screen
        name="MainHome" // 전체 식재료 리스트 화면
        component={MainHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodInfo" // 식재료 정보 화면
        component={FoodInfo}
        options={{ title: '식재료 정보' }}
      />
      <Stack.Screen
        name="RecipeInfo"
        component={RecipeInfo}
        options={{ title: '레시피 정보' }}
      />
    </Stack.Navigator>
  );
};

export default Home;