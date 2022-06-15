import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SectionList,
  SafeAreaView,
  Image,
} from 'react-native';

const MyRecipeList = (props) => {
  return (
    <View style={styles.listView}>
      <View style={styles.pictureView}>
        <Image 
          style={styles.tinyLogo}
          source={{url : props.photoUrl}}
        />
      </View>
      <View style={styles.textView}>
        <View style={{
        marginBottom:3
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
            {props.recipeName}
          </Text>
        </View>
        <View style={{
          marginBottom:3
        }}>
          <Text>소요시간 : {props.makeTime}</Text>
        </View>
        <View>
          <Text>가진 식재료 : {props.foodHave}</Text>
        </View>
      </View>
    </View>
  )
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
    tinyLogo: {
      width: 69,
      height: 64,
      borderRadius: 10,
    }
});

export default MyRecipeList;
