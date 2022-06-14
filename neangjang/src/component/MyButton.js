import React from 'react';
import {Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';

const MyButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={props.style == 'id' ? styles.IDbutton : styles.button}
        >
            <Text style={props.style == 'id' ? styles.IDbuttonText : styles.buttonText}>{props.text}</Text>
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
        borderRAdius: 5,
        backgroundColor: '#E5EBFF',
    },
    IDbutton: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: '#E5EBFF',
        borderRadius: 5,
        marginLeft: 10
    },
    buttonText: {
        color: '#545454',
        fontWeight: '700',
        fontSize: 18
    },
    IDbuttonText: {
        color: '#545454',
        fontWeight: '500',
        fontSize: 14
    },
});

export default MyButton