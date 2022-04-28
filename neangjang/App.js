/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import Login from './src/login';
import Main from './src/main';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      {/* <Login /> */}
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
