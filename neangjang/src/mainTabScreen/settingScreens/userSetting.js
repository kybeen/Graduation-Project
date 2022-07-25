// [ 세팅화면 - 사용자 정보 설정 ]
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import MyTextInput from '../../component/MyTextInput';

const UserSetting = ({navigation}) => {
  const [userName, setUserName] = useState(''); // 닉네임
  const [userID, setUserID] = useState(''); // ID
  const [userPW, setUserPW] = useState(''); // PW
  const [userCheckPW, setUserCheckPW] = useState(''); // 확인용 PW
  const [checkingID, setCheckingID] = useState('');
  const [checkingPW, setCheckingPW] = useState('');

  return (
    // 사용자 정보 받아와서 띄워주기
    // (userName, userID, checkingID, userPW, userCheckPW)
    // --> 회원가입 화면이랑 똑같이 띄워주고 이름이랑 아이디는 입력된 상태로,
    // 비밀번호는 비워놓고 띄워주면 될듯
    <View style={styles.main}>
      <Text style={styles.title}>사용자 정보 수정</Text>
      <Text style={styles.description}>Username</Text>
      <MyTextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="사용할 이름을 입력해주세요."
        maxLength={20}
        autoCapitalize={'none'}
      />
      <Text style={styles.description}>ID</Text>
        <MyTextInput
          value={userID}
          onChangeText={setUserID}
          placeholder="ID를 생성해주세요."
          maxLength={20}
          autoCapitalize={'none'}
        />
      <Text style={styles.check}>{checkingID}</Text>
      <Text style={styles.description}>Password</Text>
      <MyTextInput
        value={userPW}
        onChangeText={setUserPW}
        maxLength={20}
        autoCapitalize={'none'}
        secureTextEntry={true}
        placeholder="PW를 생성해주세요."
      />
      <Text style={styles.description}>Check Password</Text>
      <MyTextInput
        value={userCheckPW}
        onChangeText={setUserCheckPW}
        maxLength={20}
        autoCapitalize={'none'}
        secureTextEntry={true}
        placeholder="PW를 확인해주세요."
      />
      <Text style={styles.check}>{checkingPW}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={[styles.buttonText, {color: 'red'}]}>계정 삭제</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    //backgroundColor: 'yellow',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    //backgroundColor: 'pink',
    fontSize: 40,
    fontWeight: '600',
    width: '83%',
    height: 90
  },
  description: {
    //backgroundColor: 'skyblue',
    fontSize: 20,
    fontWeight: '400',
    width: '83%',
    paddingBottom: 5,
    marginTop: -5,
  },
  check: {
    fontSize: 11.5,
    color: 'red',
    width: '83%',
    marginTop: -15,
    paddingBottom: 15,
    textAlign: 'left'
  },
  button: {
      width: '83%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 11,
      borderRadius: 5,
      backgroundColor: '#E5EBFF',
      borderWidth: 1,
      borderColor: 'grey',
  },
  deleteButton: {
      width: '83%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 11,
      borderRadius: 5,
      borderColor: 'grey',
      borderWidth: 1
  },
  buttonText: {
      color: '#545454',
      fontWeight: '700',
      fontSize: 18
  }
});

export default UserSetting;