// [ 커스텀 컴포넌트 - 음식추가 팝업창 ]
// state 전달 문제 + View 안맞아서 커스텀 컴포넌트로 아직 분리 못함

import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ActionButton from 'react-native-action-button';

import { ListContext } from '../mainTabScreen/list';

const MyFoodAddPopUp = () => {
  const [foodPopUp, setFoodPopUp] = useState(useContext(ListContext));

    return (
      <View style={styles.centerdView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={foodPopUp}
        >
          <View style={styles.centerdView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setFoodPopUp(!foodPopUp)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
   }


const styles = StyleSheet.create({
    centerdView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'red'
    },
    modalView: { 
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default MyFoodAddPopUp