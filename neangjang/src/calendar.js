/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
    title: 'Expiration Soon',
    data: ['Milk', 'Cucumber', 'Potato'],
  },
];

const ResDATA = [
  {
    title: 'Recommend Recipe',
    data: ['Mashed Potato', 'Oconomiyaki', 'Pasta', 'Soap'],
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Calendar = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>YeongBin's NaengJang</Text>
      </View>
      <View style={styles.mainView}>
        <SectionList
          style={{alignContent: 'center'}}
          backgroundColor="blue"
          sections={ExpDATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <SectionList
          backgroundColor="blue"
          sections={ResDATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
      <View style={styles.bottomBar}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  mainView: {
    flex: 10,
    backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 0,
    width: '95%',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Calendar;
