// [ 레시피 리스트 화면 - 메인]
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ActionButton from 'react-native-action-button';

import { MainTabContext } from '../mainTab';
import MyRecipeList from '../../component/MyRecipeList';
import MyTextInput from '../../component/MyTextInput';

const MainRecipe = ({navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext); // 사용자 정보
  const [recipeData, setRecipeData] = useState([]); // 받아올 레시피 정보
  const [searchText, setSearchText] = useState(''); // 검색 텍스트

  const getRecipeData = () => {
    fetch('https://www.bigthingiscoming.shop/app/recipes/'+usrIdx)
      .then((res) => res.json())
      .then((res) => setRecipeData(res.result))
      .catch((error) => {
        Alert.alert("Error");
      });
  };

  useEffect(() => {
    getRecipeData();  
    //console.log(recipeData);
  }, [recipeData]);

  const renderItem = ({item}) => {
    if (searchText === '') {  // 아무것도 입력하지 않았을 떄
      return (
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
    else {  // 검색어를 입력했을 때 해당 검색어가 이름에 포함되는 레시피만 렌더링
      if (item.recipeName.includes(searchText)){
        return (
          <MyRecipeList 
            photoUrl={item.photoUrl}
            recipeName={item.recipeName}
            makeTime={item.makeTime}
            foodHave={item.foodHave}
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
       <Text style={styles.titleText}>{usrName}의 레시피</Text>
     </View>
     {/* 검색창 View */}
     <View style={styles.searchView}>
       <Icon name='ios-search' size={25}/>
       <MyTextInput
         value={searchText}
         onChangeText={setSearchText}
         placeholder="레시피 검색"
         autoCapitalize={'none'}
       />
       <TouchableOpacity style={{justifyContent: 'center', paddingBottom: 17}} onPress={() => setSearchText('')}>
         <Text style={styles.cancelButton}>취소</Text>
       </TouchableOpacity>
     </View>
     {/* 레시피 리스트 렌더링 View */}
     <View style={styles.mainView}>
       <FlatList
         data={recipeData}
         renderItem={renderItem}
         keyExtractor={(item) => item.idx}
       />
     </View>
     <ActionButton
       buttonColor="rgba(30,100,230,1)"
       onPress={() => navigation.navigate('AddRecipe')}
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
    height: 90,
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

export default MainRecipe;