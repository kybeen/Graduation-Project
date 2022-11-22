// [ 레시피 리스트 화면 - 레시피 추가 화면 ]
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Button, Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MainTabContext } from '../mainTab';

import { Calendar, CalendarList } from 'react-native-calendars';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Fontiso from 'react-native-vector-icons/dist/Fontisto';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AddRecipe = ({route, navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);

  // 추가할 레시피 정보 state
  const [addName, setAddName] = useState(''); // 레시피 이름
  const [addDetail, setAddDetail] = useState(''); // 레시피 내용
  const [addMakeTime, setAddMakeTime] = useState(''); // 레시피 조리시간
  const [addUrl, setAddUrl] = useState(''); // 레시피 URL
  const [addPhoto, setAddPhoto] = useState(''); // 레시피 사진
  const [addIgName, setAddIgName] = useState([]); // 레시피 재료

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

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewStyle}>
          <View style={styles.container}>
            {/* 상단 영역 */}
            <View style={styles.title}>
              <Text style={styles.titleText}>레시피를 추가해주세요.</Text>
            </View>
            {/* 레시피 정보 입력 영역 */}
            <View style={styles.body}>
              <View style={styles.addArea}>
                {/* 레시피 이름 입력 영역 */}
                <View style={styles.addContent}>
                  <Text style={styles.addContentName}>레시피 이름 :</Text>
                  <View style={{flex: 3}}>
                    <TextInput
                        style={[styles.addContentInput, {width: '100%'}]}
                        value={addName}
                        onChangeText={setAddName}
                        placeholder={'이름을 입력해주세요.'}
                        placeholderTextColor={'#485460'}
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
                                // launchCamera({}, response=>{
                                //     setAddPhoto(response.assets[0].uri);
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
                                //     setAddPhoto(response.assets[0].uri);
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
                {/* 레시피 내용 입력 영역 */}
                <View style={styles.addContent}>
                  <Text style={styles.addContentName}>상세내용 :</Text>
                  <View style={{flex: 3}}>
                    <TextInput
                        style={[styles.addContentInput, {width: '100%'}]}
                        value={addName}
                        onChangeText={setAddName}
                        placeholder={'레시피 상세내용을 입력해주세요.'}
                        placeholderTextColor={'#485460'}
                    />
                  </View> 
                </View>
                {/* 레시피 소요시간 입력 영역 */}
                <View style={styles.addContent}>
                  <Text style={styles.addContentName}>소요시간 :</Text>
                  <View style={{flex: 3}}>
                    <TextInput
                        style={[styles.addContentInput, {width: '100%'}]}
                        value={addName}
                        onChangeText={setAddName}
                        placeholder={'레시피 소요시간을 입력해주세요.'}
                        placeholderTextColor={'#485460'}
                    />
                  </View> 
                </View>
                {/* 레시피 재료 입력 영역 */}
                <View style={styles.addContent}>
                  <Text style={styles.addContentName}>재료 :</Text>
                  <View style={{flex: 3}}>
                    <TextInput
                        style={[styles.addContentInput, {width: '100%'}]}
                        value={addName}
                        onChangeText={setAddName}
                        placeholder={'레시피 재료를 입력해주세요.'}
                        placeholderTextColor={'#485460'}
                    />
                  </View> 
                </View>
              </View>
              {/* 하단 바코드, 저장 버튼 */}
              <View style={[styles.buttonArea, {zIndex: 1}]}>
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
    )
  };

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
        fontSize: 15,
        color: '#485460',
    },
    addContentInput: {  // 직접 입력 추가 스타일
        backgroundColor: '#cecece',
        height: '60%',
        paddingLeft: 15,
        borderRadius: 15,
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

export default AddRecipe;