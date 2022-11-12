// [ 세팅화면 - 사용자 정보 설정 ]
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import MyTextInput from '../../component/MyTextInput';
import { MainTabContext } from '../mainTab';

const UserSetting = ({navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음

  const [userName, setUserName] = useState(usrName); // 닉네임
  const [userID, setUserID] = useState(usrId); // ID
  const [userPW, setUserPW] = useState(''); // PW
  const [userCheckPW, setUserCheckPW] = useState(''); // 확인용 PW
  const [checkingID, setCheckingID] = useState('');
  const [checkingPW, setCheckingPW] = useState('');

  // 앱이 렌더링될때마다 PW일치여부 확인 후 일치하지 않을 경우 문구 출력
  useEffect(() => {
    if (userPW === userCheckPW) {
      setCheckingPW('');
    }
    else {
      setCheckingPW('password가 일치하지 않습니다.')
    };
    //fetch("http://localhost:9000/app/users/checkId", {
    fetch("https://www.bigthingiscoming.shop/app/users/checkId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      userID
    ),
  })
  .then(response => response.json())
  .then(response => {
    {
      // console.log(response);
      // response.result === "생성 불가능한 아이디" ?
      // setCheckingID("생성 불가능한 아이디입니다.") :
      // setCheckingID('')
    }
  });
  });

  // 사용자 정보 수정 저장 버튼 눌렀을 때
  const pressSave = () => {
    console.log(userID, userPW, userCheckPW, userName);
    fetch(`https://www.bigthingiscoming.shop/app/users/${usrIdx}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userId": userID,
        "userPw_1": userPW,
        "userPw_2": userCheckPW,
        "userName": userName,
      }),
    })
    .then(response => response.json())
    .then(response => {
      switch(response.code){
        case 1000:
            Alert.alert(
                "사용자 정보 수정 완료.",
                '사용자 정보가 수정되었습니다.',
                [{
                    text: "OK", 
                    onPress: () => {
                        navigation.goBack(); // 설정화면으로 돌아가기
                    }
                }]);
          console.log(response.code, "User Info Modifying Successed!!");
          break;
      }
    })
    // .then(response => {{console.log(response);}})
    .catch(error => {console.log('Fetch Error', error);})
  }

  const pressDelete = () => { // 식재료 삭제 요청
    fetch(`https://www.bigthingiscoming.shop/app/users/${usrIdx}/delete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(response => {
        switch(response.code){
          case 1000:
            Alert.alert(
              "계정 삭제 완료.",
              '계정이 삭제되었습니다.',
              [{
                  text: "OK", 
                  onPress: () => {
                      navigation.navigate('MainSetting'); // 시작화면으로 돌아가기
                      navigation.goBack();
                      navigation.goBack();
                      navigation.goBack();
                  }
              }]);
            console.log(response.code, "User Deleted Successfully!!");
            break;
        }
        console.log(response);
      })
      // .then(response => {{console.log(response);}})
      .catch(error => {console.log('Fetch Error', error);})
  }

  return (
    // 사용자 정보 받아와서 띄워주기
    // (userName, userID, checkingID, userPW, userCheckPW)
    // --> 회원가입 화면이랑 똑같이 띄워주고 이름이랑 아이디는 입력된 상태로,
    // 비밀번호는 비워놓고 띄워주면 될듯
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.main}>
          <Text style={styles.title}>사용자 정보 수정</Text>
          <Text style={styles.description}>Username</Text>
          <MyTextInput
            value={userName}
            onChangeText={setUserName}
            placeholder="변경할 이름을 입력해주세요."
            maxLength={20}
            autoCapitalize={'none'}
          />
          <Text style={styles.description}>ID</Text>
            <MyTextInput
              value={userID}
              onChangeText={setUserID}
              placeholder="변경할 ID를 입력해주세요."
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
            placeholder="변경할 PW를 입력해주세요."
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
          <TouchableOpacity style={styles.button} onPress={()=>pressSave()}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={()=>{
            Alert.alert(
              '계정 삭제',
              '정말 계정을 삭제하시겠습니까?',
              [
                {text: '취소', onPress: () => {}, style: 'cancel'},
                {text: '확인', onPress: () => {pressDelete()}, style: 'destructive'}
              ]
            )
          }}>
            <Text style={[styles.buttonText, {color: 'red'}]}>계정 삭제</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    //backgroundColor:'red'
  },
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
    height: 90,
    color: '#485460',
  },
  description: {
    //backgroundColor: 'skyblue',
    fontSize: 20,
    fontWeight: '400',
    width: '83%',
    paddingBottom: 5,
    marginTop: -5,
    color: '#485460',
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
      borderRadius: 15,
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
      borderRadius: 15,
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