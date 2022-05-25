import React from 'react';
import {Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';

const MyButton = ({onPress, text}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.buttonText}>{text}</Text>
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
    buttonText: {
        color: '#545454',
        fontWeight: '700',
        fontSize: 18
    }
});

export default MyButton