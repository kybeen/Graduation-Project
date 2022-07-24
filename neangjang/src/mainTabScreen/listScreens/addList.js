// [ 식재료 리스트 화면 - 식재료 추가 화면 ]
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

import MyButton from '../../component/MyButton';

const AddList = ({navigation}) => {
    const [addName, setAddName] = useState('');
    const [addPicture, setAddPicture] = useState('');
    const [addCategory, setAddCategory] = useState('');
    const [addStorageMethod, setAddStorageMethod] = useState('');
    const [addExpiration, setAddExpiration] = useState('');

  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.titleText}>음식을 추가해주세요.</Text>
        </View>
        <View style={styles.body}>
            <View style={styles.addArea}>
                <View style={styles.addContent}>
                    <Text style={styles.addContentName}>이름 :</Text>
                    <View style={{flex: 3}}>
                        <TextInput
                            style={[styles.addContentInput, {width: '90%'}]}
                            value={addName}
                            onChangeText={setAddName}
                            placeholder={'이름을 입력해주세요.'}
                        />
                    </View>
                </View>
                <View style={[styles.addContent, {flex: 3}]}>
                    <Text style={styles.addContentName}>사진 :</Text>
                    <View style={styles.addPictureInput}>
                        <Text>사진 추가</Text>
                    </View>
                </View>
                <View style={styles.addContent}>
                    <Text style={styles.addContentName}>카테고리 :</Text>
                    <View style={styles.addPickerInput}>
                        <Text>카테고리 선택</Text>
                    </View>
                </View>
                <View style={styles.addContent}>
                    <Text style={styles.addContentName}>수량 :</Text>
                    <View style={{flex: 3}}>
                        <TextInput
                            style={[styles.addContentInput, {width: '60%'}]}
                            value={addName}
                            onChangeText={setAddName}
                            placeholder={'수량을 입력해주세요.'}
                        />
                    </View>
                </View>
                <View style={styles.addContent}>
                    <Text style={styles.addContentName}>저장방식 :</Text>
                    <View style={styles.addPickerInput}>
                        <Text>저장방식 선택</Text>
                    </View>
                </View>
                <View style={styles.addContent}>
                    <Text style={styles.addContentName}>유통기한 :</Text>
                    <View style={styles.addDayInput}>
                        <Text>유통기한 입력</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <Text>버튼</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        backgroundColor: 'skyblue',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    titleText: {
        fontSize: 30,
        fontWeight: '600',
    },
    body: {
        backgroundColor: 'yellow',
        flex: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    addArea: {
        backgroundColor: 'pink',
        flex: 9,
    },
    addContent: {
        backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    addContentName: {
        flex: 1,
        fontSize: 20,
    },
    addContentInput: {  // 직접 입력 추가 스타일
        backgroundColor: '#cecece',
        height: '60%',
        paddingLeft: 15,
        borderRadius: 10,
    },
    addPictureInput: {  // 사진 추가 스타일
        flex: 3,
    },
    addPickerInput: {   // picker로 선택하는 스타일
        flex: 3,
    },
    addDayInput: {  // 달력으로 선택하는 스타일
        flex: 3,
    },
    buttonArea: {
        backgroundColor: 'lightgreen',
        flex: 1,
    }
});

export default AddList;