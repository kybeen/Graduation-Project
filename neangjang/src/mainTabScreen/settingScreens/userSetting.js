// [ 세팅화면 - 사용자 정보 설정 ]
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const UserSetting = ({navigation}) => {
  return (
    <View>
        <Text>사용자 정보 설정</Text>
        {/* 사용자 정보 받아와서 띄워주기
        (userName, userID, checkingID, userPW, userCheckPW)
        --> 회원가입 화면이랑 똑같이 띄워주고 이름이랑 아이디는 입력된 상태로,
        비밀번호는 비워놓고 띄워주면 될듯
        */}
    </View>
  );
}

const styles = StyleSheet.create({

});

export default UserSetting;