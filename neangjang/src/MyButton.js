import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const MyButton = ({onPress, text}) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
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