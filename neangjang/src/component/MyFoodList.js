// [ 커스텀 컴포넌트 - 식재료 리스트 ]
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

const MyFoodList = (props) => {
  return (
    <TouchableOpacity style={styles.listView} onPress={props.touchEvent}>
      <View style={styles.pictureView}>
        <Image
          style={styles.tinyLogo}
          source={{url : props.foodPhoto}}
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
            {props.foodName}
          </Text>
        </View>
        <View style={{
          marginBottom:3
        }}>
          <Text>수량 : {props.amount}</Text>
        </View>
        <View>
          <Text>유통기한: {props.expirationDate}</Text>
        </View>
      </View>
      <View style={styles.ed_LeftView}>
        <Text style={styles.ed_LeftText}>{props.ed_Left}일 남음</Text>
      </View>
    </TouchableOpacity>
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
    marginLeft: 5,
    //backgroundColor: 'pink',
  },
  listView: {
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: -2,
    height: 80,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pictureView: {
    flex: 1.2,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    },
    ed_LeftView: {
      flex: 1.5,
      marginHorizontal: 10,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: 'pink',
    },
    ed_LeftText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    tinyLogo: {
      width: 55,
      height: 55,
      borderRadius: 10,
    },
});

export default MyFoodList;
