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
import { MainTabContext } from './mainTab';
import MyRecipeList from '../component/MyRecipeList';
import MyFoodList from '../component/MyFoodList';

const renderFoodItem = ({item, index}) => {
  if (index < 3) return (   // 3개까지만 출력하도록 조건문 설정
  <MyFoodList 
    foodPhoto={item.foodPhoto}
    foodName={item.foodName}
    amount={item.amount}
    expirationDate={item.expirationDate}
    ed_Left={item.ed_Left}
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
    />
  )
}

const Home = () => {
  const { usrId, usrName } = useContext(MainTabContext);
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
    //fetch("http://localhost:9000/app/home/"+usrId)
    fetch("https://www.bigthingiscoming.shop/app/home/"+usrId)
    .then(response => response.json())
    .then(response => {
      setFoodData(response.result[0]);
      setRecipeData(response.result[1]);
    })
    .catch(error => {console.log('Fetch Error', error);})
  }

  useEffect(() => {
    getData(); 
  }, []); // [] : 첫 렌더링 시에만 useEffect 호출

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{usrName}의 냉장냉장</Text>
      </View>
      <View style={styles.listView}>
        <Text style={styles.subTitleText}>유통기한 임박상품</Text>
        <FlatList
          scrollEnabled={false}
          data={foodData}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.idx}
        />
        </View>
        <View style={styles.recipeView}>
        <Text style={styles.subTitleText}>추천 레시피</Text>
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
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '90%',
    paddingBottom: 10
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

export default Home;
