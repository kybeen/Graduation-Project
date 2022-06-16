/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, { useContext, useEffect, useState } from 'react';
 import {
   View,
   Text,
   TextInput,
   Button,
   StyleSheet,
   SectionList,
   SafeAreaView,
   ScrollView,
   FlatList,
   Alert,
   ActivityIndicator,
 } from 'react-native';
 import MyFoodList from '../component/MyFoodList';
 import Icon from 'react-native-vector-icons/dist/Ionicons';

 import { MainTabContext } from './mainTab';
 import MyTextInput from '../component/MyTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
//  const renderItem = ({item}) => {
//    return (
//     <MyFoodList 
//       foodPhoto={item.foodPhoto}
//       foodName={item.foodName}
//       amount={item.amount}
//       expirationDate={item.expirationDate}
//       ed_Left={item.ed_Left}
//     />
//   )
// }
 
 const List = () => {
   const { id, name } = useContext(MainTabContext);  // 로그인 시 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달
   const [foodData, setFoodData] = useState([]);  // 받아올 음식들의 정보
   const [searchText, setSearchText] = useState(''); // 검색 텍스트

   useEffect(() => {
    fetch("https://www.bigthingiscoming.shop/app/foods/"+id)
    .then(response => response.json())
    .then(response => {
      setFoodData(response.result);
    })
    .catch(error => {console.log('Fetch Error', error);})
   }, []); // [] : 첫 렌더링 시에만 useEffect 호출

   // 검색 텍스트에 따라 해당하는 식새료만 렌더링
   const renderItem = ({item}) => {
    if (searchText === '') {  // 아무것도 입력하지 않았을 떄
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
       <View style={styles.titleView}>
         <Text style={styles.titleText}>{name}의 식재료</Text>
       </View>
       <View style={styles.searchView}>
        <Icon name='ios-search' size={25}/>
        <MyTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="식재료 검색"
          autoCapitalize={'none'}
        />
        {/* <Icon name='close-sharp' size={30} onPress={()=>{alert('')}}/> */}
        <TouchableOpacity onPress={() => setSearchText('')}>
          <Text style={styles.cancelButton}>취소</Text>
        </TouchableOpacity>
       </View>
       <View style={styles.mainView}>
         <FlatList
           data={foodData}
           renderItem={renderItem}
           keyExtractor={(item) => item.idx}
         />
       </View>
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
    alignContent: 'center',
    flexDirection: 'row',
    width: '95%',
    //backgroundColor: 'red',
   },
   mainView: {
     flex: 10,
     alignSelf: 'center',
     justifyContent: 'center',
     width: '95%'
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
 });
 
 export default List;
 








// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   SectionList,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import Ionicon from 'react-native-vector-icons/Ionicons';

// import { MainTabContext } from './mainTab';
// import MyTextInput from '../component/MyTextInput';

// const ListHeader = (props) => {
//   return (
//     <Text style={styles.listHeader}>{props.name}의 음식</Text>
//   );
// };

// const FoodList = () => {
//   return (
//     <ScrollView style={styles.foodList}>
//       <FoodItem/>
//       <FoodItem/>
//     </ScrollView>
//   );
// };

// const FoodItem = () => {
//   return (
//     <View style={styles.foodItem}>
//       <Text>음식이름</Text>
//       <Text>수량</Text>
//       <Text>유통기한</Text>
//       <Text>남은기간</Text>
//     </View>
//   );
// };

// const List = () => {
//   const { id, name } = useContext(MainTabContext);  // 로그인 시 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달

//   const [foodName, setFoodName] = useState(''); // 음식이름
//   //const []  // 음식사진 - url로 받아옴
//   const [amount, setAmount] = useState(''); // 수량
//   const [storageType, setStorageType] = useState(''); // 보관방법
//   const [expDate, setExpDate] = useState(''); // 유통기한
//   const [leftDay, setLeftDay] = useState(''); // 남은기간
//   const [searchText, setSearchText] = useState(''); // 검색 텍스트

//   useEffect(() => {
//     fetch("https://www.bigthingiscoming.shop/app/foods/"+id)
//     .then(response => response.json())
//     .then(response => {
//       setFoodName(response.result.foodName);
//       setAmount(response.result.amount);
//       setStorageType(response.result.storageType);
//       setExpDate(response.result.expirationDate);
//       setLeftDay(response.result.ed_Left);
//     })
//     .catch(error => {console.log('Fetch Error', error);})
//   }, []); // [] : 첫 렌더링 시에만 useEffect 호출

//   return (
//     <View style={{ flex: 1 }}>
//       <ListHeader name={name}/>
//       <MyTextInput
//         value={searchText}
//         onChangeText={setSearchText}
//         placeholder="식재료 검색"
//         autoCapitalize={'none'}
//       />
//       <FoodList/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   listHeader: {
//     backgroundColor: 'pink',
//     fontSize: 40
//   },
//   searchBox: {
//   },
//   FoodList: {
//     backgroundColor: 'lightblue'
//   },
//   foodItem: {
//     backgroundColor: 'yellow',
//     marginBottom: 5,
//   },
// });

// export default List;
