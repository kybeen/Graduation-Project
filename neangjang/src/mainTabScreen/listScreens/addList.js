// [ 식재료 리스트 화면 - 식재료 추가 화면 ]
import React, { useState, useContext, createContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MainTabContext } from '../mainTab';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Fontiso from 'react-native-vector-icons/dist/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Calendar, CalendarList } from 'react-native-calendars';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddList = ({route, navigation}) => {
    // useEffect(() => {
    //     if (route.params?.productName) {
    //       //setAddName(route.params?.productName);
    //     }
    // }, [route.params?.productName]);
    const { usrId, usrName } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음

    // 추가할 식재료 정보 state
    const [addName, setAddName] = useState('');                     // 이름
    const [addPhoto, setAddPhoto] = useState('/Users/kim-youngbin/Desktop/BTIC/Application/neangjang/assets/icons/list_fill.png');               // 사진
    const [addCategory, setAddCategory] = useState('');             // 카테고리
    const [addAmount, setAddAmount] = useState(1);                  // 수량
    const [addStorageType, setAddStorageType] = useState('');       // 저장방식
    const [addExpiration, setAddExpiration] = useState('');         // 유통기한

    // dropdown picker용 state
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryItems, setCategoryItems] = useState([ // 카테고리 종류
        { label: "유제품", value: 1 },
        { label: "돼지", value: 2 },
        { label: "소", value: 3 },
        { label: "닭", value: 4 },
        { label: "가공식품", value: 5 },
        { label: "빵", value: 6 },
        { label: "생선", value: 7 },
    ]);
    const [storageTypeOpen, setStorageTypeOpen] = useState(false);
    const [storageTypeItems, setStorageTypeItems] = useState([ // 저장방식 종류
        { label: "실온보관", value: 1 },
        { label: "냉동보관", value: 2 },
        { label: "냉장보관", value: 3 },
    ]);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false); // 날짜 입력 캘린더 모달

    // picker가 열리면 다른 picker가 닫히도록
    const onCategoryOpen = () => {
        setStorageTypeOpen(false);
    }
    const onStorageOpen = () => {
        setCategoryOpen(false);
    }

    const pressAdd = () => { // 저장(추가) 버튼 눌렀을 때, 추가할 식재료 정보 POST
        //fetch("http://localhost:9000/app/users/logIn", {
        fetch("https://www.bigthingiscoming.shop/app/foods/"+usrId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "foodName": addName,
            "foodPhoto": addPhoto,
            "categoryIdx": addCategory,
            "amount": addAmount,
            "storageType": addStorageType,
            "expirationDate": addExpiration,
          }),
        })
        .then(response => response.json())
        .then(response => {
          switch(response.code){
            case 1000: // 식재료 추가 성공
                Alert.alert(
                    "식재료 추가 완료.",
                    '식재료가 성공적으로 추가되었습니다.',
                    [{
                        text: "OK", 
                        onPress: () => {
                            navigation.goBack(); // 식재료 리스트 화면으로 돌아가기
                        }
                    }]);
              console.log(response.code, "Success");
              break;
            case 2030: // 식재료 이름 X
                console.log(response.code);
                Alert.alert("입력되지 않은 정보가 있습니다.", '식재료 이름을 입력해주세요.', [{text: "OK"}]);
            case 2031: // 식재료 카테고리 X
                console.log(response.code);
                Alert.alert("입력되지 않은 정보가 있습니다.", '식재료 카테고리를 입력해주세요.', [{text: "OK"}]);
            case 2032: // 식재료 수량 X
                console.log(response.code);
                Alert.alert("입력되지 않은 정보가 있습니다.", '식재료 수량을 입력해주세요.', [{text: "OK"}]);
            case 2033: // 식재료 보관방법 X
                console.log(response.code);
                Alert.alert("입력되지 않은 정보가 있습니다.", '식재료 보관방법을 입력해주세요.', [{text: "OK"}]);
            case 2034: // 식재료 유통기한 X
                console.log(response.code);
                Alert.alert("입력되지 않은 정보가 있습니다.", '식재료 유통기한을 입력해주세요.', [{text: "OK"}]);
          }
          console.log(response);
        })
        // .then(response => {{console.log(response);}})
        .catch(error => {console.log('Fetch Error', error);})
      }

  // 렌더링 영역    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewStyle}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>음식을 추가해주세요.</Text>
                </View>
                <View style={styles.body}>
                    {/* 식재료 정보 입력 영역 */}
                    <View style={[styles.addArea, {zIndex: 2}]}>
                        {/* 이름 입력 */}
                        <View style={styles.addContent}>
                            <Text style={styles.addContentName}>이름 :</Text>
                            <View style={{flex: 3}}>
                                <TextInput
                                    style={[styles.addContentInput, {width: '100%'}]}
                                    value={addName}
                                    onChangeText={setAddName}
                                    placeholder={'이름을 입력해주세요.'}
                                />
                            </View>
                        </View>
                        {/* 사진 입력 */}
                        <View style={[styles.addContent, {flex: 2}]}>
                            <Text style={styles.addContentName}>사진 :</Text>
                            <View style={styles.addPhotoInput}>
                                <View style={styles.picture}>
                                    <Image
                                        source={{uri : addPhoto}}
                                        style={{width:'100%',height:'100%'}}
                                    />
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
                        {/* 카테고리 입력 */}
                        <View style={[styles.addContent, {zIndex: 3}]}>
                            <Text style={styles.addContentName}>카테고리 :</Text>
                            <View style={styles.addPickerInput}>
                                {/* <Text>카테고리 선택</Text> */}
                                <DropDownPicker
                                    open={categoryOpen}
                                    onOpen={onCategoryOpen}
                                    items={categoryItems}
                                    value={addCategory}
                                    setOpen={setCategoryOpen}
                                    setValue={setAddCategory}
                                    setItems={setCategoryItems}
                                    placeholder='카테고리 선택'
                                />
                            </View>
                        </View>
                        {/* 수량 입력 */}
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
                        {/* 저장방식 입력 */}
                        <View style={[styles.addContent, {zIndex: 2}]}>
                            <Text style={styles.addContentName}>저장방식 :</Text>
                            <View style={styles.addPickerInput}>
                                <DropDownPicker
                                    open={storageTypeOpen}
                                    onOpen={onStorageOpen}
                                    items={storageTypeItems}
                                    value={addStorageType}
                                    setOpen={setStorageTypeOpen}
                                    setValue={setAddStorageType}
                                    setItems={setStorageTypeItems}
                                    placeholder='저장방식 선택'
                                />
                            </View>
                        </View>
                        {/* 유통기한 입력 */}
                        <View style={[styles.addContent, {flex: 1}]}>
                            <Modal animationType="slide" transparent={true} visible={isCalendarVisible}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'}}>
                                    <View style={{
                                        flex: 0.9,
                                        borderRadius : 10,
                                        borderColor : '#cccccc',
                                        borderWidth : 1,
                                        backgroundColor : '#ffffff',
                                        padding: 5,
                                    }}>
                                        {/* <Text style={{fontSize:20}}>Modal 화면입니다.</Text> */}
                                        <Calendar
                                            onDayPress={(day)=>{
                                                console.log(day["dateString"], "is selected!!")
                                                setAddExpiration(day["dateString"])
                                            }}
                                            // pastScrollRange={50}
                                            // futureScrollRange={50}
                                            // scrollEnabled={true}
                                            // showScrollIndicator={true}
                                        />
                                        {/* 캘린더 숨기기 */}
                                        <Button title='닫기' onPress={() => setIsCalendarVisible(false)}/>
                                    </View>
                                </View>
                            </Modal>
                            <Text style={styles.addContentName}>유통기한 :</Text>
                            <View style={styles.expContent}>
                                <Text>{addExpiration}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.expButton}
                                onPress={()=>{
                                    setIsCalendarVisible(true)
                                }}
                            >
                                <Text style={styles.expButtonText}>날짜 선택</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* 하단 바코드, 저장 버튼 */}
                    <View style={[styles.buttonArea, {zIndex: 1}]}>
                        <TouchableOpacity style={[styles.button2, {width: '55%'}]} onPress={() => navigation.navigate('Scanner', {prevScreen: 'add', addName: addName})}>
                            <MaterialCommunityIcons name={'barcode-scan'} size={40} color={'#545454'}/>
                            <Text style={{paddingLeft:5,fontSize: 15, fontWeight: '600', color: '#545454'}}>바코드(QR)로 등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button2, {width: '35%'}]}
                            onPress={()=>{
                                console.log("HELLO",addName, addPhoto, addCategory, addAmount, addStorageType, addExpiration);
                                pressAdd();
                            }}
                        >
                            <MaterialCommunityIcons name={'content-save-check'} size={40} color={'#545454'}/>
                            <Text style={{fontSize: 20, fontWeight: '600', color: '#545454'}}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        //backgroundColor:'red'
    },
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
        flexDirection: 'row',
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
    expContent: {  // 유통기한 입력값 들어갈 영역
        backgroundColor: '#cecece',
        borderRadius: 10,
        flex: 2,
        marginHorizontal: 7,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    expButton: { // 유통기한 날짜 선택 버튼
        backgroundColor: '#E5EBFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: '45%',
        flexDirection: 'row',
    },
    expButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#545454'
    }
});

export default AddList;