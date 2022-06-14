/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
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
            {item.recipeName}
          </Text>
        </View>
        <View style={{
          marginBottom:3
        }}>
          <Text>소요시간 : {item.makeTime}</Text>
        </View>
        <View>
          <Text>가진 식재료 : {item.foodHave}</Text>
        </View>
      </View>
    </View>
  )
}

const LIMIT = 7;

const Recipe = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipeData = () => {
    setLoading(true);
    fetch('https://www.bigthingiscoming.shop/app/recipes/1') 
      .then((res) => res.json())
      .then((res) => setRecipeData(res.result))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error");
      });
  };

  useEffect(() => {
    getRecipeData();  
  }, []);

  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      getRecipeData();
    }
  };

  return (
    <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>레시피</Text>
      </View>
      <View style={styles.mainView}>
        <FlatList
          data={recipeData}
          renderItem={renderItem}
          keyExtractor={(item) => item.idx}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
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
