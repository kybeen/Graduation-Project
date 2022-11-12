// [ 식재료 리스트 화면 - 식재료 정보 화면 ]
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { MainTabContext } from '../mainTab';

const RecipeInfo = ({route, navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const [recipeName, setRecipeName] = useState('');
  const [detail, setDetail] = useState('');
  const [makeTime, setNameTime] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [igName, setIgName] = useState('');
  const [recipeData, setRecipeData] = useState([]);
  fetch(`https://www.bigthingiscoming.shop/app/recipes/detail/${route.recipeIdx}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(response => setRecipeName(response.result.recipeName))
  .catch(error => {console.log('Fetch Error', error);})

  console.log(recipeName);

  const pressDelete = () => { // 식재료 삭제 요청
    fetch(`https://www.bigthingiscoming.shop/app/foods/${usrIdx}/${foodIdx}/delete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(response => {
        switch(response.code){
          case 1000:
            Alert.alert(
              "식재료 삭제 완료.",
              '식재료가 삭제되었습니다.',
              [{
                  text: "OK", 
                  onPress: () => {
                      navigation.goBack(); // 식재료 리스트 화면으로 돌아가기
                  }
              }]);
            console.log(response.code, "Successfully Deleted!!");
            break;
          case 2003:
            console.log(response.code, response.message);
        }
        console.log(response);
      })
      // .then(response => {{console.log(response);}})
      .catch(error => {console.log('Fetch Error', error);})
    // Alert.alert(
    //     '식재료 삭제',
    //     '정말 삭제 하시겠습니까?',
    //     [
    //         {text: '취소', onPress: () => {}, style: 'cancel'},
    //         {text: '확인', onPress: () => {}, style: 'destructive'}
    //     ]
    // )
  }

  // 렌더링 영역    
  return (
    <View style={styles.container}>
        <View style={styles.infoView}>
            <View style={styles.mainInfo}>
                <View style={styles.photoView}>
                    <Image style={styles.photo} resize='cover' source={{url : photoUrl}}/>
                </View>
                <View style={styles.nameView}>
                    <Text>{usrName} 님의 레시피</Text>
                    <Text style={styles.name}>{recipeName}</Text>
                    <Text></Text>
                    <Text>조리시간 : {makeTime}</Text>
                    <View>
                        <Button
                            onPress={recipeUrl}
                            title="URL"
                            color="#4aa8d8"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.subInfo}>
                <Text>[재료]</Text>
                <Text>{igName}</Text>
            </View>
            <View style={styles.detailInfo}>
                <Text>[상세정보]</Text>

            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        //backgroundColor: 'skyblue'
    },
    infoView: {
        flex:5,
        borderWidth: 2,
        //backgroundColor: 'skyblue',
    },
    bottomView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'pink'
    },
    mainInfo: {
        flex: 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        //backgroundColor: 'gray',
    },
    photoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: '70%',
        height: '90%',
        borderRadius: 10,
    },
    nameView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: '600',
    },
    subInfo: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 30,
        //backgroundColor: 'blue'
    },
    detailInfo: {
        flex: 4,
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 30,
        //backgroundColor: 'blue'
    },
    infoName: {
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#E5EBFF',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        width: '40%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        //backgroundColor: 'yellow',
        color: '#545454',
        fontSize: 20,
        fontWeight: '700'
    },
});

export default RecipeInfo;