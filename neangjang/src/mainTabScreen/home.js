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

const Home = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>YeongBin's NaengJang</Text>
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
});

export default Home;
