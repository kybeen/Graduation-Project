// [ 식재료 리스트 화면 - 메인 ]
import React, { useContext, useEffect, useState, createContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ActionButton from 'react-native-action-button';

import { MainTabContext } from '../mainTab';
import MyTextInput from '../../component/MyTextInput'
import MyFoodList from '../../component/MyFoodList';


const MainList = ({navigation}) => {
  const { usrId, usrName } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const [foodData, setFoodData] = useState([]);  // 받아올 음식들의 정보
  const [searchText, setSearchText] = useState(''); // 검색 텍스트

  useEffect(() => {
   //fetch("http://localhost:9000/app/foods/"+usrId)
   fetch("https://www.bigthingiscoming.shop/app/foods/"+usrId)
   .then(response => response.json())
   .then(response => {
     setFoodData(response.result);
   })
   .catch(error => {console.log('Fetch Error', error);})
  }, ); // [] : 첫 렌더링 시에만 useEffect 호출

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
            // category: item.category,
            amount: item.amount,
            storageType: item.storageType,
            expirationDate: item.expirationDate,
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
         />
       )
     }
   }
  }

  return (
   <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
    {/* 상단 제목 View */}
     <View style={styles.titleView}>
       <Text style={styles.titleText}>{usrName}의 식재료</Text>
     </View>
     {/* 검색창 View */}
     <View style={styles.searchView}>
      <Icon name='ios-search' size={25}/>
      <MyTextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="식재료 검색"
        autoCapitalize={'none'}
      />
      <TouchableOpacity style={{justifyContent: 'center', paddingBottom: 17}} onPress={() => setSearchText('')}>
        <Text style={styles.cancelButton}>취소</Text>
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
       buttonColor="rgba(30,100,230,1)"
       onPress={() => navigation.navigate('AddList')}
     />
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
    //backgroundColor: 'yellow',
  },
  searchView: {
   flex: 1,
   justifyContent: 'center',
   //alignContent: 'center',
   flexDirection: 'row',
   //width: '95%',
   marginTop: 5,
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
    flex:4,
    marginTop: 10,
  },
  cancelButton: {
   fontSize: 15,
   fontWeight: '700',
  },
  input: {
   backgroundColor: 'lightgray',
   width: '60%',
   height: '100%',
   paddingVertical: 8,
   paddingHorizontal: 10,
   borderRadius: 10,
   fontSize: 15,
   //ackgroundColor: 'pink',
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