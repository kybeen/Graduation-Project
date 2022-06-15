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
 import MyRecipeList from '../component/MyRecipeList';

 import { MainTabContext } from './mainTab';
 import MyTextInput from '../component/MyTextInput';
 
 const renderItem = ({item}) => {
   return (
     <View style={styles.listView}>
       <View style={styles.pictureView}>
       </View>
       <View style={styles.textView}>
         <View style={{
         marginBottom:3
         }}>
           <Text style={{
             fontSize: 20,
             fontWeight: 'bold',
           }}>
             {item.foodName}
           </Text>
         </View>
         <View style={{
           marginBottom:3
         }}>
           <Text>수량 : {item.amount}</Text>
         </View>
         <View>
           <Text>유통기한: {item.expirationDate}</Text>
         </View>
       </View>
       <View style={styles.pictureView}>
         <Text>{item.ed_Left}</Text>
       </View>
     </View>
   )
 }
 
 const List = () => {
   const { id, name } = useContext(MainTabContext);  // 로그인 시 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달
   const [foodData, setFoodData] = useState([]);
   const [searchText, setSearchText] = useState(''); // 검색 텍스트
   useEffect(() => {
    fetch("https://www.bigthingiscoming.shop/app/foods/"+id)
    .then(response => response.json())
    .then(response => {
      setFoodData(response.result);
    })
    .catch(error => {console.log('Fetch Error', error);})
   }, [],
   console.log(foodData)); // [] : 첫 렌더링 시에만 useEffect 호출

   return (
     <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
       <View style={styles.titleView}>
         <Text style={styles.titleText}>{name}의 식재료</Text>
       </View>
       <View style={{flex: 1, justifyContent: 'center', alignContent: 'flex-start'}}>
        <MyTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="식재료 검색"
          autoCapitalize={'none'}
        />
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
   },
   mainView: {
     flex: 10,
     alignSelf: 'center',
     justifyContent: 'center',
     width: '95%'
   },
   titleText: {
     fontSize: 25,
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
   }
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
