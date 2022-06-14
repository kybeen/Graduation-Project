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

import Ionicon from 'react-native-vector-icons/Ionicons';

const renderItem = ({item}) => {
  return (
    <View>
      <View>
        <Text>idx: {item.idx}</Text>
      </View>
      <View>
        <Text>foodName: {item.foodName}</Text>
      </View>
      <View>
        <Text>amount: {item.amount}</Text>
      </View>
      <View>
        <Text>storageType: {item.storageType}</Text>
      </View>
      <View>
        <Text>expirationDate: {item.expirationDate}</Text>
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
    fetch('https://www.bigthingiscoming.shop/app/foods/1') 
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
    <SafeAreaView>
      <Text>{recipeData.result}</Text>
      <FlatList
        data={recipeData}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.idx)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    backgroundColor: 'red',
    width: '90%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flex: 10,
    backgroundColor: 'green',
    width: '90%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Recipe;
