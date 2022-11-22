// [ 식재료 리스트 화면 - 식재료 정보 수정 화면 ]
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MainTabContext } from '../mainTab';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Fontiso from 'react-native-vector-icons/dist/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Calendar, CalendarList } from 'react-native-calendars';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FoodInfoModify = ({route, navigation}) => {
    const { usrIdx, usrName, usrId } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
    const foodData = route.params.foodData;
    // 수정할 식재료 정보 state
    const [modifyName, setmodifyName] = useState(foodData.foodName);                     // 이름
    const [modifyPhoto, setmodifyPhoto] = useState(foodData.foodPhoto);               // 사진
    const [modifyCategory, setmodifyCategory] = useState(foodData.categoryIdx);             // 카테고리
    const [modifyAmount, setmodifyAmount] = useState(foodData.amount);                  // 수량
    const [modifyStorageType, setmodifyStorageType] = useState(foodData.storageType);       // 저장방식
    const [modifyExpiration, setmodifyExpiration] = useState(foodData.expirationDate);         // 유통기한
    const [foodIdx, setFoodIdx] = useState(foodData.foodIdx);       // 식재료 인덱스
    console.log(modifyAmount);
    // dropdown picker용 state
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryItems, setCategoryItems] = useState([ // 카테고리 종류
        { label: "유제품", value: 1 },
        { label: "육류", value: 2 },
        { label: "가공식품", value: 5 },
        { label: "빵", value: 6 },
        { label: "생선", value: 7 },
        { label: "채소", value: 8 },
        { label: "갑각류", value: 9 },
        { label: "음료", value: 10 },
        { label: "기타", value: 99 },
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

    useEffect(() => {
        if (route.params?.qrvalue) {
          qrvalue = JSON.parse(route.params.qrvalue);
          console.log(qrvalue);
          setmodifyName(qrvalue.foodName);
          setmodifyPhoto(qrvalue.foodPhoto);
          setmodifyCategory(qrvalue.categoryIdx);
          setmodifyAmount(qrvalue.amount);
          setmodifyStorageType(qrvalue.storageType);
          setmodifyExpiration(qrvalue.expirationDate);
        }
    }, [route.params?.qrvalue]);

    ///////// 식재료 수정에 맞게 바꿔주기
    const pressModify = () => { // 저장(추가) 버튼 눌렀을 때, 추가할 식재료 정보 POST
        console.log(modifyName, modifyPhoto, modifyCategory, modifyAmount, modifyStorageType, modifyExpiration);
        //console.log(`https://www.bigthingiscoming.shop/app/foods/${usrId}/${foodIdx}/update`);
        fetch(`https://www.bigthingiscoming.shop/app/foods/${usrIdx}/${foodIdx}/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "foodName": modifyName,
            "foodPhoto": modifyPhoto,
            "categoryIdx": modifyCategory,
            "amount": modifyAmount,
            "storageType": modifyStorageType,
            "expirationDate": modifyExpiration,
          }),
        })
        .then(response => response.json())
        .then(response => {
          switch(response.code){
            case 1000:
                Alert.alert(
                    "식재료 정보 수정 완료.",
                    '식재료가 정보가 수정되었습니다.',
                    [{
                        text: "OK", 
                        onPress: () => {
                            navigation.goBack(); // 식재료 상세정보 화면으로 돌아가기
                            navigation.goBack();
                        }
                    }]);
              console.log(response.code, "Success");
              break;
          }
          console.log(response);
        })
        // .then(response => {{console.log(response);}})
        .catch(error => {console.log('Fetch Error', error);})
      }

      const selectCamera = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        }
        launchCamera(options, (response) => {
            if (response.assets) {
                const selectedImage = response.assets[0].uri;
                setAddPhoto(selectedImage);
            }
        })
      }

      const selectImage = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        }
        launchImageLibrary(options, (response) => {
            if (response.assets) {
                const selectedImage = response.assets[0].uri;
                setAddPhoto(selectedImage);
            }
        })
      }

  // 렌더링 영역    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewStyle}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>식재료 정보 수정</Text>
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
                                    value={modifyName}
                                    onChangeText={setmodifyName}
                                    placeholder={'이름을 입력해주세요.'}
                                    placeholderTextColor={'#485460'}
                                />
                            </View>
                        </View>
                        {/* 사진 입력 */}
                        <View style={[styles.addContent, {flex: 2}]}>
                            <Text style={styles.addContentName}>사진 :</Text>
                            <View style={styles.modifyPhotoInput}>
                                <View style={styles.picture}>
                                    <Image
                                        source={{uri : modifyPhoto}}
                                        style={{width:'100%',height:'100%', borderRadius:15,}}
                                    />
                                </View>
                                <View style={styles.pictureButton}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=>{
                                            // // ios 시뮬레이터에서 동작X 핸드폰으로 확인해야함
                                            // launchCamera({}, response=>{
                                            //     setmodifyPhoto(response.assets[0].uri);
                                            // })
                                            selectCamera();
                                        }}
                                    >
                                        <Ionicons name={'camera'} size={35} color={'#545454'}/>
                                        <Text style={{fontSize: 20, fontWeight: '600', color: '#545454'}}>촬영</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=>{
                                            // launchImageLibrary({}, response=>{
                                            //     setmodifyPhoto(response.assets[0].uri);
                                            // })
                                            selectImage();
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
                                    value={modifyCategory}
                                    setOpen={setCategoryOpen}
                                    setValue={setmodifyCategory}
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
                                    value={modifyAmount}
                                    onChangeText={setmodifyAmount}
                                    placeholder={'수량을 입력해주세요.'}
                                    placeholderTextColor={'#485460'}
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
                                    value={modifyStorageType}
                                    setOpen={setStorageTypeOpen}
                                    setValue={setmodifyStorageType}
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
                                                setmodifyExpiration(day["dateString"])
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
                                <Text>{modifyExpiration}</Text>
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
                        <TouchableOpacity style={[styles.button2, {width: '55%'}]} onPress={() => navigation.navigate('Scanner', {prevScreen: 'modify'})}>
                            <MaterialCommunityIcons name={'barcode-scan'} size={40} color={'#545454'}/>
                            <Text style={{paddingLeft:5,fontSize: 15, fontWeight: '600', color: '#545454'}}>바코드(QR)로 등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button2, {width: '35%'}]}
                            onPress={()=>{
                                console.log("HELLO",modifyName, modifyPhoto, modifyCategory, modifyAmount, modifyStorageType, modifyExpiration);
                                pressModify();
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
        color: '#485460',
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
        color: '#485460',
    },
    addContentInput: {  // 직접 입력 추가 스타일
        backgroundColor: '#cecece',
        height: '60%',
        paddingLeft: 15,
        borderRadius: 15,
    },
    modifyPhotoInput: {  // 사진 추가 영역
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
        borderRadius: 15,
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
        borderRadius: 15,
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
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: '100%',
        marginHorizontal: 10,
    },
    expContent: {  // 유통기한 입력값 들어갈 영역
        backgroundColor: '#cecece',
        borderRadius: 15,
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
        borderRadius: 15,
        height: '45%',
        flexDirection: 'row',
    },
    expButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#545454'
    }
});

export default FoodInfoModify;