// [ 커스텀 컴포넌트 - 텍스트입력 칸 ]
import React from 'react';
import { TextInput, StyleSheet } from "react-native"

const MyTextInput = (props) => {
    return (
        <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            style={props.style == 'id' ? styles.id : styles.input}
            maxLength={props.maxLength}
            autoCapitalize={props.autoCapitalize}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            placeholderTextColor={'#485460'}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#cecece',
        height: 50,
        width: '83%',
        paddingLeft: 15,
        borderRadius: 14,
        alignSelf: 'center',
        marginBottom: 20,
    },
    id : {
        backgroundColor: '#cecece',
        height: 50,
        flex: 3,
        paddingLeft: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20,
    }
});

export default MyTextInput