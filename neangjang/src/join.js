/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const Join = ({navigation}) => {
const [inputID, setInputID] = React.useState('');
const [inputPW, setInputPW] = React.useState('');
const [inputName, setInputName] = React.useState('');

return (
    <View style={styles.main}>
        <View style={styles.title}>
            <Text style={{fontSize: 30, fontWeight: '700'}}>회원가입</Text>
        </View>
        <View style={styles.input}>
            <Text style={styles.description}>이름 </Text>
            <TextInput
                style={styles.inputBlock}
                value={inputName}
                onChangeText={(inputName) => setInputName(inputName)}
                maxLength={20}
                autoCapitalize={'none'}
                placeholder='  사용할 이름을 입력해주세요'
            />
        </View>
        <View style={styles.input}>
            <Text style={styles.description}>ID </Text>
            <TextInput
                style={styles.inputBlock}
                value={inputID}
                onChangeText={(inputID) => setInputID(inputID)}
                maxLength={20}
                autoCapitalize={'none'}
                placeholder='  ID를 생성해주세요'
            />
            <Button title='중복 확인' onPress={() => alert('사용 가능한 ID 입니다!')}/>
        </View>
        <View style={styles.input}>
            <Text style={styles.description}>PW </Text>
            <TextInput
                style={styles.inputBlock}
                value={inputPW}
                onChangeText={(inputPW) => setInputPW(inputPW)}
                maxLength={20}
                autoCapitalize={'none'}
                secureTextEntry={true}
                placeholder='  PW를 생성해주세요'
            />
        </View>
        <View style={styles.input}>
            <Text style={styles.description}>PW 확인 </Text>
            <TextInput
                style={styles.inputBlock}
                value={inputPW}
                onChangeText={(inputPW) => setInputPW(inputPW)}
                maxLength={20}
                autoCapitalize={'none'}
                secureTextEntry={true}
                placeholder='  PW를 생성해주세요'
            />
        </View>
        <View style={styles.button}>
            <Button title='가입하기' onPress={() => alert('회원가입 완료')}/>
        </View>
    </View>
)
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginHorizontal: 40,
        marginVertical: 50,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'yellow',
    },
    input: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        marginVertical: -10,
    },
    inputBlock: {
        backgroundColor: 'lightgrey',
        width: '70%',
        height: '30%',
        marginLeft: 10,
    },
    description: {
        fontSize: 20,
        fontWeight: '500',
    },
    button: {
        flex: 1,
        //backgroundColor: 'purple',
    },
});

export default Join;