// [ 세팅화면 - 메인 ]
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';


const MainSetting = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.titleText}>설정</Text>
        </View>
        <View style={{flex: 6, alignItems: 'center'}}>
            <TouchableOpacity
                style={styles.content}
                onPress={()=>navigation.navigate('UserSetting')}
            >
                <Text style={styles.contentTitle}>사용자 정보 설정</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>알림 설정</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>화면설정</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 50,
        fontWeight: '600',
    },
    content: {
        backgroundColor: 'skyblue',
        height: '10%',
        width: '90%',
        justifyContent: 'center',
    },
    contentTitle: {
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: '600'
    },
});

export default MainSetting;