// [ 레시피 리스트화면 Stack Navigator ]
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicon from 'react-native-vector-icons/Ionicons';

import MainRecipe from './recipeScreens/mainRecipe';
import RecipeInfo from './recipeScreens/recipeInfo';
import RecipeInfoModify from './recipeScreens/recipeInfoModify';
import AddRecipe from './recipeScreens/addRecipe';

const Stack = createNativeStackNavigator();

const Recipe = () => {
  return (
    <Stack.Navigator initialRouteName="MainRecipe">
      <Stack.Screen
        name="MainRecipe" // 전체 레시피 리스트 화면
        component={MainRecipe}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeInfo" // 레시피 상세정보 화면
        component={RecipeInfo}
        options={{ title: '레시피 정보' }}
      />
      <Stack.Screen
        name="RecipeInfoModify" // 레시피 정보 수정 화면
        component={RecipeInfoModify}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="AddRecipe" // 레시피 추가 화면
        component={AddRecipe}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

export default Recipe;