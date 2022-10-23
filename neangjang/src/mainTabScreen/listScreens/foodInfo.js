// [ 식재료 리스트 화면 - 식재료 정보 화면 ]
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

const FoodInfo = ({route, navigation}) => {

  const { foodPhoto, foodName, amount, storageType, expirationDate, ed_Left} = route.params; // API응답에 카테고리 추가해야함
  // 렌더링 영역    
  return (
    <View style={styles.container}>
        <View style={styles.infoView}>
            <View style={styles.mainInfo}>
                <View style={styles.photoView}>
                    <Image style={styles.photo} source={{url : foodPhoto}}/>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{foodName}</Text>
                </View>
            </View>
            <View style={styles.subInfo}>
                <Text style={styles.infoName}>카테고리 : </Text>
            </View>
            <View style={styles.subInfo}>
                <Text style={styles.infoName}>수량 : {amount}</Text>
            </View>
            <View style={styles.subInfo}>
                <Text style={styles.infoName}>저장방식 : {storageType}</Text>
            </View>
            <View style={styles.subInfo}>
                <Text style={styles.infoName}>유통기한 : {expirationDate}까지</Text>
                <Text style={styles.infoName}>{ed_Left}일 남음</Text>
            </View>
        </View>
        <View style={styles.bottomView}>
            {/* 수정 버튼 */}
            <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('FoodInfoModify', {
                    foodData : route.params
                })}
            >
                <Text style={styles.buttonText}>정보 수정</Text>
            </TouchableOpacity>
            {/* 삭제 버튼 */}
            <TouchableOpacity
                style={styles.button}
                onPress={()=>alert('삭제')}
                // onPress={() => Alert.alert(
                //     '식재료 삭제',
                //     '정말 삭제 하시겠습니까?',
                //     [
                //         {text: '취소', onPress: () => {}, style: 'cancel'},
                //         {text: '확인', onPress: () => {}, style: 'destructive'}
                //     ]
                // )}
            >
                <Text style={[styles.buttonText, {color: 'red'}]}>삭제</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        //backgroundColor: 'skyblue'
    },
    infoView: {
        flex:5,
        borderWidth: 2,
        //backgroundColor: 'skyblue',
    },
    bottomView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'pink'
    },
    mainInfo: {
        flex: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        //backgroundColor: 'gray',
    },
    photoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: '80%',
        height: '70%',
        borderRadius: 10,
    },
    nameView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: '600',
    },
    subInfo: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 30,
        //backgroundColor: 'blue'
    },
    infoName: {
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#E5EBFF',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        width: '40%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        //backgroundColor: 'yellow',
        color: '#545454',
        fontSize: 20,
        fontWeight: '700'
    },
});

export default FoodInfo;