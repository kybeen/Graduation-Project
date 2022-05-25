import React from 'react';
import { TextInput, StyleSheet } from "react-native"

const MyTextInput = ({value, onChangeText, maxLength, autoCapitalize, secureTextEntry, placeholder }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#cecece',
        height: 50,
        width: '83%',
        paddingLeft: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20,
    }
});

export default MyTextInput