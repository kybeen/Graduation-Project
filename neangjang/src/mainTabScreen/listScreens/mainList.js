// [ 식재료 리스트 화면 - 메인 ]
import React, { useContext, useEffect, useState, createContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback, Keyboard,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ActionButton from 'react-native-action-button';

import { MainTabContext } from '../mainTab';
import MyTextInput from '../../component/MyTextInput'
import MyFoodList from '../../component/MyFoodList';


const MainList = ({navigation}) => {
  const { usrIdx, usrName } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const [foodData, setFoodData] = useState([]);  // 받아올 음식들의 정보
  const [searchText, setSearchText] = useState(''); // 검색 텍스트

  useEffect(() => {
   fetch("https://www.bigthingiscoming.shop/app/foods/"+usrIdx)
   .then(response => response.json())
   .then(response => {
     setFoodData(response.result);
   })
   .catch(error => {console.log('Fetch Error', error);})
  },[foodData]); // [] : 첫 렌더링 시에만 useEffect 호출

  // 검색 텍스트에 따라 해당하는 식재료만 렌더링
  const renderItem = ({item}) => {
   if (searchText === '') {  // 아무것도 입력하지 않았을 떄
     return (
       <MyFoodList 
         foodPhoto={item.foodPhoto}
         foodName={item.foodName}
         amount={item.amount}
         expirationDate={item.expirationDate}
         ed_Left={item.ed_Left}
         touchEvent={()=>navigation.navigate('FoodInfo', {
            foodPhoto: item.foodPhoto,
            foodName: item.foodName,
            categoryIdx: item.categoryIdx,
            amount: item.amount,
            storageType: item.storageType,
            expirationDate: item.expirationDate,
            foodIdx: item.idx, // 식재료 인덱스 (정보 수정 시 사용)
            ed_Left: item.ed_Left,
         })}
       />
     )
   }
   else {  // 검색어를 입력했을 때 해당 검색어가 이름에 포함되는 식재료만 렌더링
     if (item.foodName.includes(searchText)){
       return (
         <MyFoodList 
           foodPhoto={item.foodPhoto}
           foodName={item.foodName}
           amount={item.amount}
           expirationDate={item.expirationDate}
           ed_Left={item.ed_Left}
           touchEvent={()=>navigation.navigate('FoodInfo', {
            foodPhoto: item.foodPhoto,
            foodName: item.foodName,
            categoryIdx: item.categoryIdx,
            amount: item.amount,
            storageType: item.storageType,
            expirationDate: item.expirationDate,
            foodIdx: item.idx, // 식재료 인덱스 (정보 수정 시 사용)
            ed_Left: item.ed_Left,
         })}
         />
       )
     }
   }
  }

  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
      {/* 상단 제목 View */}
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{usrName}의 식재료</Text>
      </View>
      {/* 검색창 View */}
      <View style={styles.searchView}>
        <View style={styles.icon}>
          <Icon name='ios-search' size={25} style={{color: '#485460'}}/>
        </View>
        {/* <MyTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="식재료 검색"
          autoCapitalize={'none'}
        /> */}
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
          autoCapitalize={'none'}
          placeholder={'식재료 검색'}
          placeholderTextColor={'#485460'}
        />
        <TouchableOpacity style={styles.cancelButton} onPress={() => setSearchText('')}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>
      {/* 식재료 리스트 렌더링 View */}
      <View style={styles.mainView}>
        <FlatList
          data={foodData}
          renderItem={renderItem}
          keyExtractor={(item) => item.idx}
        />
      </View>
      <ActionButton
        //buttonColor="rgba(30,100,230,1)"
        buttonColor="#b6d2f2"
        onPress={() => navigation.navigate('AddList')}
      />
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
    //backgroundColor: '#dbe9f9',
    borderRadius: 10,
  },
  searchView: {
   flex: 1,
   justifyContent: 'center',
   //alignContent: 'center',
   flexDirection: 'row',
   //width: '95%',
   //marginTop: 5,
   //backgroundColor: 'pink',
  },
  mainView: {
    flex: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
    //backgroundColor: 'skyblue',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '90%',
    color: '#485460',
  },
  listView: {
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: -2,
    height: 80,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pictureView: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textView: {
    flex: 4,
    marginTop: 10,
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight : -3,
    justifyContent: 'center',
    //backgroundColor:'red',
  },
  input: {
    flex: 9,
    backgroundColor: 'lightgray',
    //width: '100%',
    height: '90%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 15,
   //backgroundColor: 'pink',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelText: {
   fontSize: 15,
   fontWeight: '700',
   color: '#485460',
   //marginTop: 10,
  },
  closeButton: {
   borderRadius: 20,
   padding: 7,
   elevation: 2,
   backgroundColor: "#2196F3",
  },
  textStyle: {
   color: "white",
   fontWeight: "bold",
   textAlign: "center"
  },
});

export default MainList;