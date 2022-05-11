/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {View, Text, Button } from 'react-native';
 
 const TitleScreen = ({navigation}) => {
     return(
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{fontSize: 40}}>냉장고</Text>
             <Button title="Login" onPress={() => navigation.navigate('Login')}/>
         </View>
     );
 };
 
 export default TitleScreen;
 