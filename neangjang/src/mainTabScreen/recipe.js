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
import { MainTabContext } from './mainTab';
import MyRecipeList from '../component/MyRecipeList';

const ListHeader = (props) => {
  return (
    <Text style={styles.titleText}>{props.name}의 레시피</Text>
  );
};

const renderItem = ({item}) => {
  return (
    <MyRecipeList 
      photoUrl={item.photoUrl}
      recipeName={item.recipeName}
      makeTime={item.makeTime}
      foodHave={item.foodHave}
    />
  )
}

const Recipe = () => {
  const { usrId, usrName } = useContext(MainTabContext);
  const [recipeData, setRecipeData] = useState([]);

  const getRecipeData = () => {
    fetch('https://www.bigthingiscoming.shop/app/recipes/'+usrId) 
      .then((res) => res.json())
      .then((res) => setRecipeData(res.result))
      .catch((error) => {
        Alert.alert("Error");
      });
  };

  useEffect(() => {
    getRecipeData();  
    console.log(recipeData);
  }, []);

  return (
    <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
      <View style={styles.titleView}>
        <ListHeader name={usrName}/>
      </View>
      <View style={styles.mainView}>
        <FlatList
          data={recipeData}
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
    }
});

export default Recipe;
