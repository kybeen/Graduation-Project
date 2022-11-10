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
            color: '#485460',
          }}>
            {props.foodName}
          </Text>
        </View>
        <View style={{
          marginBottom:3
        }}>
          <Text style={styles.text}>수량 : {props.amount}</Text>
        </View>
        <View>
          <Text style={styles.text}>유통기한: {props.expirationDate}</Text>
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
    //backgroundColor: 'pink',
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
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#485460',
    //marginBottom: -2,
    marginVertical: 2,
    height: 80,
    justifyContent: 'center',
    flexDirection: 'row',
    //IOS
    // shadowColor: "#000000", //그림자색
    // shadowOpacity: 0.1,//그림자 투명도
    // shadowOffset: { width: 5, height: 5 }, //그림자 위치
    //ANDROID
    //elevation: 3,
    backgroundColor: '#E5EBFF',
  },
  pictureView: {
    flex: 1.2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#485460',
    marginHorizontal: 10,
    marginVertical: 10.5,
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
      color: '#485460',
    },
    tinyLogo: {
      width: 55,
      height: 55,
      borderRadius: 10,
    },
    text: {
      color: '#485460',
    },
});

export default MyFoodList;
