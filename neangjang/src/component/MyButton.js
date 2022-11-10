// [ 커스텀 컴포넌트 - 버튼 ]
import React from 'react';
import {Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';

const MyButton = (props) => {
    return (
        <TouchableOpacity
            disabled = {props.disabled}
            onPress={props.onPress}
            style={props.disabled === true ? styles.disabledButton : styles.button}
        >
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '83%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 11,
        borderRadius: 15,
        backgroundColor: '#E5EBFF',
    },
    disabledButton: {
        width: '83%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 11,
        borderRAdius: 5,
        backgroundColor: 'lightgray',
    },
    buttonText: {
        color: '#545454',
        fontWeight: '700',
        fontSize: 18
    }
});

export default MyButton