/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import MyButton from '../MyButton'
import MyTextInput from '../MyTextInput';

const Join = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const [userCheckPW, setUserCheckPW] = useState('');
  const [checkingPW, setCheckingPW] = useState('');

  useEffect(() => {
    if (userPW === userCheckPW) {
      setCheckingPW('');
    }
    else {
      setCheckingPW('password가 일치하지 않습니다.')
    }
  });

  return (
    <View style={styles.main}>
      <Text style={styles.title}>회원가입</Text>
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
      <MyButton
        onPress={()=>alert('회원가입이 완료되었습니다.')}
        text="Sign up"
      />
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
    fontSize: 40,
    fontWeight: '600',
    width: '83%',
    height: 90
  },
  description: {
    fontSize: 20,
    fontWeight: '400',
    width: '83%',
    paddingBottom: 5,
  },
  check: {
    color: 'red',
    width: '80%',
    marginTop: -15,
    paddingBottom: 15
  }
});

export default Join;



// const Join = ({navigation}) => {
//   const [inputID, setInputID] = React.useState('');
//   const [inputPW, setInputPW] = React.useState('');
//   const [inputcheckPW, setInputcheckPW] = React.useState('');
//   const [inputName, setInputName] = React.useState('');
//   const [checkPW, setcheckPW] = React.useState('password가 일치하지 않습니다.');

//   const writePW = () => {
//     inputPW === inputcheckPW
//       ? setcheckPW('Password가 일치합니다.')
//       : setcheckPW('Password가 일치하지 않습니다.');
//   };

//   return (
//     <View style={styles.main}>
//       <View style={styles.title}>
//         <Text style={{fontSize: 30, fontWeight: '700'}}>회원가입</Text>
//       </View>
//       <View style={styles.input}>
//         <Text style={styles.description}>이름 </Text>
//         <TextInput
//           style={styles.inputBlock}
//           value={inputName}
//           onChangeText={inputName => setInputName(inputName)}
//           maxLength={20}
//           autoCapitalize={'none'}
//           placeholder="  사용할 이름을 입력해주세요"
//         />
//       </View>
//       <View style={styles.input}>
//         <Text style={styles.description}>ID </Text>
//         <TextInput
//           style={styles.inputBlock}
//           value={inputID}
//           onChangeText={inputID => setInputID(inputID)}
//           maxLength={20}
//           autoCapitalize={'none'}
//           placeholder="  ID를 생성해주세요"
//         />
//         <Button
//           title="중복 확인"
//           onPress={() => alert('사용 가능한 ID 입니다!')}
//         />
//       </View>
//       <View style={styles.input}>
//         <Text style={styles.description}>PW </Text>
//         <TextInput
//           style={styles.inputBlock}
//           value={inputPW}
//           onChangeText={inputPW => setInputPW(inputPW)}
//           onChange={writePW}
//           maxLength={20}
//           autoCapitalize={'none'}
//           secureTextEntry={true}
//           placeholder="  PW를 생성해주세요"
//         />
//       </View>
//       <View style={styles.input}>
//         <Text style={styles.description}>PW 확인 </Text>
//         <TextInput
//           style={styles.inputBlock}
//           value={inputcheckPW}
//           onChangeText={inputcheckPW => setInputcheckPW(inputcheckPW)}
//           onChange={writePW}
//           maxLength={20}
//           autoCapitalize={'none'}
//           secureTextEntry={true}
//           placeholder="  PW를 확인해주세요"
//         />
//         <Text>{checkPW}</Text>
//       </View>
//       <View style={styles.button}>
//         <Button title="가입하기" onPress={() => alert('회원가입 완료')} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     marginHorizontal: 40,
//     marginVertical: 50,
//   },
//   title: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     //backgroundColor: 'yellow',
//   },
//   input: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     //backgroundColor: 'blue',
//     marginVertical: -10,
//   },
//   inputBlock: {
//     backgroundColor: 'lightgrey',
//     width: '70%',
//     height: '30%',
//     marginLeft: 10,
//   },
//   description: {
//     fontSize: 20,
//     fontWeight: '500',
//   },
//   button: {
//     flex: 1,
//     //backgroundColor: 'purple',
//   },
// });

// export default Join;
