// [ 세팅화면 - 알림 설정 ]
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import notifee from '@notifee/react-native';

const NoticeSetting = ({navigation}) => {

  async function onDisplayNotification() {
    // Request permissions (required for iOS) -> IOS에서는 알림 허용 먼저 받아야 함
    await notifee.requestPermission()

    // Create a channel (required for Android) -> 안드로이드용
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: '유통기한 알림',
      body: '유통기한이 얼마 남지 않았습니다!!',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text>알림 설정</Text>
      <TouchableOpacity
          style={styles.content}
          onPress={()=>onDisplayNotification()}
      >
          <Text style={styles.contentTitle}>테스트</Text>
          {/* <Ionicon name='chevron-forward' size={30} style={styles.contentIcon}/> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    //backgroundColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#485460',
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentTitle: {
      //backgroundColor: 'yellow',
      paddingLeft: 20,
      fontSize: 18,
      fontWeight: '600',
      color: '#485460',
  },
  contentIcon: {
      //backgroundColor: 'green',
      marginRight: 10,
  },
});

export default NoticeSetting;