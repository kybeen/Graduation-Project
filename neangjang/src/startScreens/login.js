/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const Login = ({navigation}) => {
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      <View style={styles.title}>
        <Text style={styles.titleText}>냉장냉장</Text>
      </View>
      <View style={styles.loginView}>
        <TextInput
          style={styles.inputbutton}
          fontSize={20}
          autoCapitalize={'none'}
          onChangeText={text => setInputID(text)}
          value={inputID}
          padding={8}
          placeholder='ID'></TextInput>
        <TextInput
          style={styles.inputbutton}
          fontSize={20}
          secureTextEntry={true}
          autoCapitalize={'none'}
          onChangeText={text => setInputPW(text)}
          value={inputPW}
          padding={8}
          placeholder='Password'></TextInput>
      </View>
      <View style={styles.buttonView}>
        <Button title="회원가입" onPress={() => navigation.navigate('Join')} />
        <Button title="로그인" onPress={() => navigation.navigate('MainTab')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flex: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  inputbutton: {
    backgroundColor: '#cecece',
    height: 50,
    width: '70%',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Login;
