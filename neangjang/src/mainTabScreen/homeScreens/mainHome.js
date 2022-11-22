// [ 홈 화면 ]

import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SectionList,
  SafeAreaView,
  FlatList,
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import { MainTabContext } from '../mainTab';
import MyRecipeList from '../../component/MyRecipeList';
import MyFoodList from '../../component/MyFoodList';
import notifee from '@notifee/react-native';

const MainHome = ({navigation}) => {
  const { usrIdx, usrName } = useContext(MainTabContext);
  const [recipeData, setRecipeData] = useState([]);
  const [foodData, setFoodData] = useState([]);

  // const getRecipeData = () => {
  //   fetch('https://www.bigthingiscoming.shop/app/home/'+id) 
  //     .then((res) => res.json())
  //     .then((res) => )
  //     .catch((error) => {
  //       Alert.alert("Error");
  //     });
  // };

  const getData = () => {
    //fetch("http://localhost:9000/app/home/"+usrIdx)
    fetch("https://www.bigthingiscoming.shop/app/home/"+usrIdx)
    .then(response => response.json())
    .then(response => {
      setFoodData(response.result[0]);
      setRecipeData(response.result[1]);
      onDisplayNotification(response.result[0][0]);
    })
    .catch(error => {console.log('Fetch Error', error);})
  }

  useEffect(() => {
    getData(); 
  },[]); // [] : 첫 렌더링 시에만 useEffect 호출

  async function onDisplayNotification(foodData) {
    console.log(foodData)
    // Request permissions (required for iOS) -> IOS에서는 알림 허용 먼저 받아야 함
    await notifee.requestPermission()

    // Create a channel (required for Android) -> 안드로이드용
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: '유통기한 알림',
      body: `${foodData.foodName}의 유통기한이 ${foodData.ed_Left}일 남았습니다!!`,
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const renderFoodItem = ({item, index}) => {
    if (index < 3) return (   // 3개까지만 출력하도록 조건문 설정
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

  const renderRecipeItem = ({item, index}) => {
    if (index < 3) return (   // 3개까지만 출력하도록 조건문 설정
      <MyRecipeList 
        photoUrl={item.photoUrl}
        recipeName={item.recipeName}
        makeTime={item.makeTime}
        foodHave={item.foodHave}
        touchEvent={()=>navigation.navigate('RecipeInfo', {
          recipeIdx: item.idx
        })}
      />
    )
  }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{usrName}의 냉장냉장</Text>
      </View>
      <View style={styles.listView}>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>유통기한 임박상품</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={foodData}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.idx}
        />
      </View>
      <View style={styles.recipeView}>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>추천 레시피</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={recipeData}
          renderItem={renderRecipeItem}
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
  listView: {
    flex: 4.5,
    width: '95%',
    alignSelf: 'center',
  },
  recipeView: {
    flex: 5,
    width: '95%',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '90%',
    color: '#485460',
  },
  subTitle: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: 'lightgray',
    width: '50%',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    //width: '90%',
    paddingVertical: 3,
    color: '#485460',
  },
  item: {
    alignSelf: 'center',
    padding: 15,
    width: '95%',
    borderColor: 'black',
    borderWidth: 1,
  },
  header: {
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
  },
  expstyle: {
    alignContent: 'center',
  },
});

export default MainHome;
