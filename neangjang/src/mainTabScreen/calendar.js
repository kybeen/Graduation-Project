// [ 캘린터 화면 ]

import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { MainTabContext } from './mainTab';
import { Calendar, CalendarList } from 'react-native-calendars';
import CalendarHeader from 'react-native-calendars/src/calendar/header';

const CalendarView = () => {
  const { usrId, usrName } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const [calenderData, setCalenderData] = useState([]);  // 받아올 음식들의 정보
  const [selectedDate, setSelectedDate] = useState('')
  const [markedDate, setMarkedDate] = useState([]);

  useEffect(() => {
    fetch("https://www.bigthingiscoming.shop/app/calender/"+usrId)
    .then(response => response.json())
    .then(response => {
      setCalenderData(response.result);
      console.log(calenderData);
    })
    .catch(error => {console.log('Fetch Error', error);})
  }, []);

  const GetMarkedDate = ({items}) => {
    const mkdate = {[items.date]: {marked: true}};
    setMarkedDate([...markedDate, mkdate]);
    console.log(markedDate);
  }

  return (
    <View style={styles.container}>
      <Calendar style={styles.calendar}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        markedDates={{
          [selectedDate]: {selected: true},
          markedDate
        }}
      />
      <View style={styles.about}>
        <Text>해당 날짜 식품정보 </Text>
      </View>
    </View>
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
  }
});

export default CalendarView;
