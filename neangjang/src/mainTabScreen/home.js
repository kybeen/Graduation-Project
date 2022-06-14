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
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';

const ExpDATA = [
  {
    title: '유통기한 임박',
    data: [
      [
        <Text style={{justifyContent: 'flex-start'}}>우유</Text>,
        <Text style={{justifyContent: 'flex-end'}}>3일 남음</Text>,
      ],
      'Cucumber',
      'Potato',
    ],
  },
];

const ResDATA = [
  {
    title: '추천 레시피',
    data: ['Mashed Potato', 'Oconomiyaki', 'Pasta', 'Soap'],
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Home = () => {
  const [food, setFood] = useState('')
  useEffect(() => {
    //fetch('https://jsonplaceholder.typicode.com/users')
    fetch('https://www.bigthingiscoming.shop/app/foods/1')
        .then((response) => response.json())
        .then((data) => setFood(data['result'][0]['foodName']))
  })
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>OO의 냉장냉장</Text>
      </View>
      <View style={styles.mainView}>
        <SectionList
          style={{width: '95%'}}
          sections={ExpDATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <SectionList
          style={{width: '95%'}}
          sections={ResDATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    width: '90%',
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
