// [ 캘린터 화면 ]

import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { MainTabContext } from './mainTab';
import { Calendar, CalendarList } from 'react-native-calendars';
import CalendarHeader from 'react-native-calendars/src/calendar/header';

import MyFoodList from '../component/MyFoodList';

const CalendarView = () => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const [foodData, setFoodData] = useState([]);  // 받아올 음식들의 정보
  const [selectedDate, setSelectedDate] = useState({}) // 선택된 날짜
  const [markedDate, setMarkedDate] = useState([]); // 식재료들의 유통기한 리스트 (달력에 표시하기 위한)
  var temp = [];
  var obj = {};

  useEffect(() => {
    fetch("https://www.bigthingiscoming.shop/app/foods/"+usrIdx)
    .then(response => response.json())
    .then(response => {
      setFoodData(response.result);
      //console.log(response.result);
      for (var i=0; i<foodData.length; i++){
        temp.push(foodData[i].expirationDate);
      }
      for (t in temp){
        obj[temp[t]] = {marked:true};
      }
      setMarkedDate(obj);
      //console.log(markedDate);
    })
    .catch(error => {console.log('Fetch Error', error);})
  },[markedDate]);

  const GetMarkedDate = (dateList) => {
    let temp2 = {};
    for (var i=0; i<dateList.length; i++){
      temp2.dateList[i] = {marked:true};
    }
    setMarkedDate(temp2);
    console.log(markedDate);
  }

  const renderItem = ({item, index}) => {
    if (index < 3 && selectedDate === item.expirationDate) return (
      <MyFoodList 
        foodPhoto={item.foodPhoto}
        foodName={item.foodName}
        amount={item.amount}
        expirationDate={item.expirationDate}
        ed_Left={item.ed_Left}
        // touchEvent={()=>navigation.navigate('FoodInfo', {
        //     foodPhoto: item.foodPhoto,
        //     foodName: item.foodName,
        //     categoryIdx: item.categoryIdx,
        //     amount: item.amount,
        //     storageType: item.storageType,
        //     expirationDate: item.expirationDate,
        //     foodIdx: item.idx, // 식재료 인덱스 (정보 수정 시 사용)
        //     ed_Left: item.ed_Left,
        // })}
      />
    )
   }
  
  return (
    <SafeAreaView style={styles.container}>
      <Calendar style={styles.calendar}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          setSelectedDate(day.dateString);
          console.log(selectedDate);
        }}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}
        // 달력에 날짜 표시
        //markingType={'period'}
        markedDates={markedDate}
      />
      <View style={{flex:0.01, borderColor: 'gray', borderWidth:1}}/>
      <View style={styles.about}>
        {/* <Text>해당 날짜 식품정보 </Text> */}
        <View style={styles.listView}>
          <FlatList
            data={foodData}
            renderItem={renderItem}
            keyExtractor={(item) => item.idx}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    felx: 1,
  },
  about: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  listView: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'pink',
  },
});

export default CalendarView;
