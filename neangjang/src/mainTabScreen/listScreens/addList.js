// [ 식재료 리스트 화면 - 식재료 추가 화면 ]
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Fontiso from 'react-native-vector-icons/dist/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AddList = ({navigation}) => {
    // 추가할 식재료 정보 state
    const [addName, setAddName] = useState('');                     // 이름
    const [addPhoto, setAddPhoto] = useState('/Users/kim-youngbin/Desktop/BTIC/Application/neangjang/assets/icons/list_fill.png');               // 사진
    const [addCategory, setAddCategory] = useState('');             // 카테고리
    const [addAmount, setAddAmount] = useState(0);                  // 수량
    const [addStorageType, setAddStorageType] = useState('');       // 저장방식
    const [addExpiration, setAddExpiration] = useState('');         // 유통기한

    // dropdown picker용 state
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryItems, setCategoryItems] = useState([ // 카테고리 종류
        { label: "육류", value: "meat" },
        { label: "야채", value: "vegetable" },
    ]);
    const [storageTypeOpen, setStorageTypeOpen] = useState(false);
    const [storageTypeItems, setStorageTypeItems] = useState([ // 저장방식 종류
        { label: "실온보관", value: "normal" },
        { label: "냉동보관", value: "frozen" },
        { label: "냉장보관", value: "refrige" },
    ]);

  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.titleText}>음식을 추가해주세요.</Text>
        </View>
        <View style={styles.body}>
            <View style={[styles.addArea, {zIndex: 2}]}>
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
                <View style={[styles.addContent, {flex: 2}]}>
                    <Text style={styles.addContentName}>사진 :</Text>
                    <View style={styles.addPhotoInput}>
                        <View style={styles.picture}>
                            <Image
                                source={{uri : addPhoto}}
                                style={{width:'100%',height:'100%'}}
                            />
                            {/* <Text>사진</Text> */}
                        </View>
                        <View style={styles.pictureButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=>{
                                    // ios 시뮬레이터에서 동작X 핸드폰으로 확인해야함
                                    launchCamera({}, response=>{
                                        setAddPhoto(response.assets[0].uri);
                                    })
                                }}
                            >
                                <Ionicons name={'camera'} size={35} color={'#545454'}/>
                                <Text style={{fontSize: 20, fontWeight: '600', color: '#545454'}}>촬영</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=>{
                                    launchImageLibrary({}, response=>{
                                        setAddPhoto(response.assets[0].uri);
                                    })
                                }}
                            >
                                <Fontiso name={'picture'} size={25} color={'#545454'}/>
                                <Text style={{fontSize: 20, fontWeight: '600', color: '#545454'}}>앨범</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.addContent, {zIndex: 3}]}>
                    <Text style={styles.addContentName}>카테고리 :</Text>
                    <View style={styles.addPickerInput}>
                        {/* <Text>카테고리 선택</Text> */}
                        <DropDownPicker
                            open={categoryOpen}
                            items={categoryItems}
                            value={addCategory}
                            setOpen={setCategoryOpen}
                            setValue={setAddCategory}
                            setItems={setCategoryItems}
                            placeholder='카테고리 선택'
                        />
                    </View>
                </View>
                <View style={[styles.addContent, {zIndex: 1}]}>
                    <Text style={styles.addContentName}>수량 :</Text>
                    <View style={{flex: 3}}>
                        <TextInput
                            style={[styles.addContentInput, {width: '60%'}]}
                            value={addAmount}
                            onChangeText={setAddAmount}
                            placeholder={'수량을 입력해주세요.'}
                            keyboardType={'decimal-pad'}
                        />
                    </View>
                </View>
                <View style={[styles.addContent, {zIndex: 2}]}>
                    <Text style={styles.addContentName}>저장방식 :</Text>
                    <View style={styles.addPickerInput}>
                        <DropDownPicker
                            open={storageTypeOpen}
                            items={storageTypeItems}
                            value={addStorageType}
                            setOpen={setStorageTypeOpen}
                            setValue={setAddStorageType}
                            setItems={setStorageTypeItems}
                            placeholder='저장방식 선택'
                        />
                    </View>
                </View>
                <View style={[styles.addContent, {zIndex: 1}]}>
                    <Text style={styles.addContentName}>유통기한 :</Text>
                    <View style={styles.addDayInput}>
                        <Text>유통기한 입력</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.buttonArea, {zIndex: 1}]}>
                <TouchableOpacity style={[styles.button2, {width: '55%'}]}>
                    <MaterialCommunityIcons name={'barcode-scan'} size={40} color={'#545454'}/>
                    <Text style={{fontSize: 20, fontWeight: '600', color: '#545454'}}>바코드로 등록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button2, {width: '35%'}]}>
                    <MaterialCommunityIcons name={'content-save-check'} size={40} color={'#545454'}/>
                    <Text style={{fontSize: 20, fontWeight: '600', color: '#545454'}}>저장</Text>
                </TouchableOpacity>
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
        //backgroundColor: 'skyblue',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingTop: 10,
        marginTop: 20,
        marginBottom: -10,
    },
    titleText: {
        fontSize: 30,
        fontWeight: '600',
    },
    body: {
        //backgroundColor: 'yellow',
        flex: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 30,
    },
    addArea: {
        //backgroundColor: 'pink',
        flex: 9,
    },
    addContent: {
        //backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: -20,
    },
    addContentName: {
        //backgroundColor: 'orange',
        flex: 1,
        fontSize: 20,
    },
    addContentInput: {  // 직접 입력 추가 스타일
        backgroundColor: '#cecece',
        height: '60%',
        paddingLeft: 15,
        borderRadius: 10,
    },
    addPhotoInput: {  // 사진 추가 영역
        //backgroundColor: 'green',
        flex: 3,
        flexDirection: 'row',
        marginRight: 20,
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        //backgroundColor: 'pink',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: '110%'
    },
    pictureButton: {
        //backgroundColor: 'skyblue',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#E5EBFF',
        borderRadius: 10,
        width: '90%',
        height: '45%',
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    addPickerInput: {   // picker로 선택하는 스타일
        //backgroundColor: 'pink',
        flex: 3,
    },
    addDayInput: {  // 달력으로 선택하는 스타일
        flex: 3,
    },
    buttonArea: {
        //backgroundColor: 'lightgreen',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        backgroundColor: '#E5EBFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: '100%',
        marginHorizontal: 10,
    },
});

export default AddList;