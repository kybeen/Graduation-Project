// [ 식재료 리스트 화면 ]
 import React, { useContext, useEffect, useState, createContext } from 'react';
 import {
   View,
   Text,
   StyleSheet,
   SafeAreaView,
   FlatList,
   TouchableOpacity,
   Modal,
   Alert,
   TextInput,
   
 } from 'react-native';
 import MyFoodList from '../component/MyFoodList';
 import Icon from 'react-native-vector-icons/dist/Ionicons';
 import ActionButton from 'react-native-action-button';

 import { MainTabContext } from './mainTab';
 import MyTextInput from '../component/MyTextInput';
 //import MyFoodAddPopUp from '../component/MyFoodAddPopUp';
 
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

 // ---- [ 음식 추가 팝업 ] ----
 const AddFood = (props) => {
    if (props.inputType === 'name') {
      return (
        <View style={styles.popUpInput}>
          <Text style={styles.inputTitle}>{props.title}</Text>
          <TextInput style={styles.input}/>
        </View>
      )
    }
    else if (props.inputType === 'image') {
      return (
        <View style={styles.popUpInput}>
          <Text style={styles.inputTitle}>{props.title}</Text>
          <TouchableOpacity onPress={()=>alert('사진 추가 미구현')}>
            <Text>사진 추가하기</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (props.inputType === 'category') {
      return (
        <View style={styles.popUpInput}>
          <Text style={styles.inputTitle}>{props.title}</Text>
          <TextInput style={styles.input}/>
        </View>
      )
    }
    else if (props.inputType === 'amount') {
      return (
        <View style={styles.popUpInput}>
          <Text style={styles.inputTitle}>{props.title}</Text>
          <TextInput style={styles.input}/>
        </View>
      )
      
    }
    else if (props.inputType === 'storage') {
      return (
        <View style={[styles.popUpInput]}>
          <Text style={styles.inputTitle}>{props.title}</Text>
          <TouchableOpacity style={{ backgroundColor: 'lightgray', borderRadius: 10, marginHorizontal: 5, height: '100%', }}>
            <Text style={{ marginTop: 5, marginHorizontal: 5, }}>냉장보관</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'lightgray', borderRadius: 10, marginHorizontal: 5, height: '100%', }}>
            <Text style={{ marginTop: 5, marginHorizontal: 5, }}>냉동보관</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'lightgray', borderRadius: 10, marginHorizontal: 5, height: '100%', }}>
            <Text style={{ marginTop: 5, marginHorizontal: 5, }}>실온보관</Text>
          </TouchableOpacity>
        </View>
      )
      
    }
    else if (props.inputType === 'expiration') {
      return (
        <View style={styles.popUpInput}>
          <Text style={styles.inputTitle}>{props.title}</Text>
          <TextInput style={styles.input}/>
        </View>
      )
      
    }
 }

 const List = () => {
   const { usrId, usrName } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
   const [foodData, setFoodData] = useState([]);  // 받아올 음식들의 정보
   const [searchText, setSearchText] = useState(''); // 검색 텍스트
   const [foodPopUp, setFoodPopUp] = useState(false); // 음식 추가 팝업

   useEffect(() => {
    fetch("http://localhost:9000/app/foods/"+usrId)
    //fetch("https://www.bigthingiscoming.shop/app/foods/"+usrId)
    .then(response => response.json())
    .then(response => {
      setFoodData(response.result);
    })
    .catch(error => {console.log('Fetch Error', error);})
   }, []); // [] : 첫 렌더링 시에만 useEffect 호출

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
    <SafeAreaView style={{flexDirection: 'column', flex: 1, backgroundColor: foodPopUp ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255,255,255,1)'}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{usrName}의 식재료</Text>
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
      <ActionButton
        buttonColor="rgba(30,100,230,1)"
        onPress={() => setFoodPopUp(true)}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={foodPopUp}
      >
        <View style={styles.centerdView}>
          <View style={styles.popUpView}>
            <Text style={styles.popUpTitle}>음식을 추가해주세요</Text>
            <View style={styles.popUpInputs}>
              <AddFood title='이름 : ' inputType='name'/>
              <AddFood title='사진 : ' inputType='image'/>
              <AddFood title='카테고리 : ' inputType='category'/>
              <AddFood title='수량 : ' inputType='amount'/>
              <AddFood title='저장방식 : ' inputType='storage'/>
              <AddFood title='유통기한 : ' inputType='expiration'/>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFoodPopUp(!foodPopUp)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
   centerdView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
   },
   popUpView: { 
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    width: '90%',
    height: '55%',
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
   },
   popUpTitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: '700'
   },
   popUpInputs: {
    marginVertical: 30,
    justifyContent: 'center',
   },
   popUpInput: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
   },
   inputTitle: {
    fontSize: 20,
    fontWeight: '500',
    width: '30%',
    //backgroundColor: 'skyblue',
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
