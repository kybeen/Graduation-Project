/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
 
 import MyButton from '../component/MyButton'
 import MyTextInput from '../component/MyTextInput';
 
 const Login = ({navigation}) => {
   const [inputID, setInputID] = useState(''); // ID
   const [inputPW, setInputPW] = useState(''); // PW
 
   const pressLogin = () => { // 로그인 버튼 눌렀을 때, 로그인 정보 POST
    fetch("https://www.bigthingiscoming.shop/app/users/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userId": inputID,
        "userPw": inputPW,
      }),
    })
    .then(response => response.json())
    .then(response => {
      switch(response.code){
        case 1000:
          Alert.alert(
            "로그인 성공", response.result.userName + '님 환영합니다.', 
            [{ text: 'OK', 
              onPress: () => {
                navigation.navigate('MainTab', {
                  id: response.result.idx,
                  name: response.result.userName,
                });
              }
            }]);
          console.log(response.code);
          break;
        case 2010:
          Alert.alert("일치하는 ID가 없습니다.", 'ID를 다시 입력해주새요.', [{text: 'OK'}]);
          console.log(response.code);
          break;
        case 2011:
          Alert.alert("PW가 일치하지 않습니다.", 'PW를 다시 확인해주새요.', [{text: 'OK'}]);
          console.log(response.code);
          break;
      }
    })
    // .then(response => {{console.log(response);}})
    .catch(error => {console.log('Fetch Error', error);})
  }

   return (
     <View style={styles.main}>
       <Text style={styles.title}>로그인</Text>
       <Text style={styles.description}>ID</Text>
       <MyTextInput
         value={inputID}
         onChangeText={setInputID}
         placeholder="ID를 입력해주세요."
         maxLength={20}
         autoCapitalize={'none'}
       />
       <Text style={styles.description}>Password</Text>
       <MyTextInput
         value={inputPW}
         onChangeText={setInputPW}
         maxLength={20}
         autoCapitalize={'none'}
         secureTextEntry={true}
         placeholder="PW를 입력해주세요."
       />
       <View style={styles.buttonView}>
         <View style={{flex: 1}}>
          <MyButton
            onPress={() => pressLogin()}
            text="로그인"
          />
         </View>
         <View style={{flex: 1}}>
          <MyButton
            onPress={() => navigation.navigate('Join')}
            text="회원가입"
          />
         </View>
       </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   main: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   title: {
     fontSize: 50,
     fontWeight: '600',
     width: '83%',
     height: 90
   },
   description: {
     fontSize: 20,
     fontWeight: '400',
     width: '83%',
     paddingBottom: 5,
     marginTop: -10,
   },
   check: {
     color: 'red',
     width: '80%',
     marginTop: -15,
     paddingBottom: 15
   },
   buttonView: {
     flexDirection: 'row',
     width: '85%'
   },
 });
 
 export default Login;






// import React, { useState } from 'react';
// import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

// const Login = ({navigation}) => {
//   const [inputID, setInputID] = useState('');
//   const [inputPW, setInputPW] = useState('');

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
//       <View style={styles.title}>
//         <Text style={styles.titleText}>냉장고</Text>
//       </View>
//       <View style={styles.loginView}>
//         <TextInput
//           style={styles.inputbutton}
//           fontSize={20}
//           autoCapitalize={'none'}
//           onChangeText={text => setInputID(text)}
//           value={inputID}
//           padding={8}
//           placeholder='ID'></TextInput>
//         <TextInput
//           style={styles.inputbutton}
//           fontSize={20}
//           secureTextEntry={true}
//           autoCapitalize={'none'}
//           onChangeText={text => setInputPW(text)}
//           value={inputPW}
//           padding={8}
//           placeholder='Password'></TextInput>
//       </View>
//       <View style={styles.buttonView}>
//         <Button title="회원가입" onPress={() => navigation.navigate('Join')} />
//         <Button title="로그인" onPress={() => navigation.navigate('MainTab')} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     flex: 2,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginView: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonView: {
//     flex: 3,
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-start',
//   },
//   titleText: {
//     fontSize: 50,
//     fontWeight: 'bold',
//   },
//   inputbutton: {
//     backgroundColor: '#cecece',
//     height: 50,
//     width: '70%',
//     marginTop: 5,
//     marginBottom: 5,
//   },
// });

// export default Login;
