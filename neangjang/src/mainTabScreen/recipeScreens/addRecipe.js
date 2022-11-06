// [ 레시피 리스트 화면 - 레시피 추가 화면 ]
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

const AddRecipe = ({route, navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);

  // 추가할 레시피 정보 state
  const [addName, setAddName] = useState(''); // 레시피 이름
  const [addDetail, setAddDetail] = useState(''); // 레시피 내용
  const [addMakeTime, setAddMakeTime] = useState(''); // 레시피 조리시간
  const [addUrl, setAddUrl] = useState([]); // 레시피 URL
  const [addPhoto, setAddPhoto] = useState([]); // 레시피 사진
  const [addIgName, setAddIgName] = useState([]); // 레시피 재료

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
              <View style={[styles.addArea, {zIndex: 2}]}>
                {/* 레시피 이름 입력 영역 */}
                <View style={styles.addContent}>
                  <Text>레시피 이름</Text>
                </View>
                {/* 레시피 내용 입력 영역 */}
                <View style={styles.addContent}>
                  <Text>레시피 내용</Text>
                </View>
                {/* 레시피 소요시간 입력 영역 */}
                <View style={styles.addContent}>
                  <Text>레시피 소요시간</Text>
                </View>
                {/* 레시피 재료 입력 영역 */}
                <View style={styles.addContent}>
                  <Text>레시피 재료</Text>
                </View>
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

export default AddRecipe;