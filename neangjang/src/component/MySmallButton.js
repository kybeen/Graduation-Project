import React from 'react';
import {Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';

const MySmallButton = ({onPress, text}) => {
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
        width: '20%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 11,
        borderRAdius: 5,
        backgroundColor: '#E5EBFF',
    },
    buttonText: {
        color: '#545454',
        fontWeight: '600',
        fontSize: 14
    }
});

export default MySmallButton