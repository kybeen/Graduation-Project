import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SectionList,
  SafeAreaView,
} from 'react-native';

const MyRecipeList = (props) => {
  <View style={styles.textView}>
    <View style={styles.contentView}>
      <Text style={styles.titleText}>
        {props.recipeName}
      </Text>
    </View>
    <View style={styles.contentView}>
      <Text>소요시간 : {props.makeTime}</Text>
    </View>
    <View>
      <Text>가진 식재료 : {props.foodHave}</Text>
    </View>
</View>
};

const styles = StyleSheet.create({
  titleView: {
    marginBottom:3,
  },
  titleText: {
    fontSize: 20,
      fontWeight: 'bold',
  },
  textView: {
    flex:4,
    marginTop: 10,
  }
});

export default MyRecipeList;
