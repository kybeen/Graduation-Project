// [ 식재료 리스트 화면 - 식재료 정보 화면 ]
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, FlatList } from 'react-native';
import { MainTabContext } from '../mainTab';

const RecipeInfo = ({route, navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const [recipeName, setRecipeName] = useState('');
  const [detailText, setDetailText]  = useState('');
  const [makeTime, setMakeTime] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [igName, setIgName] = useState('');

  const { recipeIdx } = route.params;

  useEffect(() => {
    //const recipe = getRecipeData();
    fetch(`https://www.bigthingiscoming.shop/app/recipes/detail/${recipeIdx}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(response => {
        //console.log(response.result[3][0]);
        setRecipeName(response.result[0][0].recipeName);
        setDetailText(response.result[0][0].detail.split("$"));
        setMakeTime(response.result[0][0].makeTime);
        setPhotoUrl(response.result[1][0].photoUrl);
        setRecipeUrl(response.result[2][0].recipeUrl);
        setIgName(response.result[3][0].igName);
        console.log(detailText);
    })
    .catch(error => {console.log('Fetch Error', error);})
  }, []);

  const renderParseText = ({item}) => {
    return (
        <View>
            <Text style={styles.detailText}>{item}</Text>
            <Text></Text>
        </View>
    );
  };

  // 렌더링 영역    
  return (
    <View style={styles.container}>
        <View style={styles.mainInfo}>
            <View style={styles.photoView}>
                <Image style={styles.photo} resize='cover' source={{url : photoUrl}}/>
            </View>
            <View style={styles.nameView}>
                <Text style={[styles.name, {fontSize: 10}]}>{usrName} 님의 레시피</Text>
                <Text style={styles.name}>{recipeName}</Text>
                <Text style={[styles.name, {fontSize: 15, marginTop: 15}]}>조리시간 : {makeTime}</Text>
                <View style={styles.url}>
                    <TouchableOpacity>
                        <Text style={styles.urlText}>URL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.subInfo}>
            <View style={styles.subTitle}>
                <View style={styles.subTitleBackgrnd}>
                    <Text style={styles.subTitleText}>[재료]</Text>
                </View>
            </View>
            <View style={styles.subCont}>
                <Text style={{fontSize: 20, fontWeight: '600', color: '#485460',}}>{igName}</Text>
            </View>
        </View>
        <View style={styles.detailInfo}>
            <ScrollView>
                <View style={styles.detailTitle}>
                    <Text style={styles.subTitleText}>[상세정보]</Text>
                </View>
                <View style={styles.detailCont}>
                    {/* <Text style={styles.detailText}>{detail}</Text> */}
                    <FlatList
                        data={detailText} // 만들고자 하는 리스트의 source를 담는 prop
                        renderItem={renderParseText} // data로 받은 소스들 각각의 item들을 render 시켜주는 콜백함수
                        keyExtractor={(item) => String(item.id)} // 각각의 item에 고유의 키를 주는 것
                    />
                </View>
            </ScrollView>
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
    mainInfo: {
        flex: 2,
        borderWidth: 0.2,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#E5EBFF',
    },
    photoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: '80%',
        height: '80%',
        borderRadius: 15,
    },
    nameView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 30,
        fontWeight: '600',
        color: '#485460',
    },
    url: {
        backgroundColor: "skyblue",
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    urlText: {
        color: "#485460"
    },
    subInfo: {
        flex: 1,
        borderWidth: 0.2,
        borderRadius: 15,
        flexDirection: 'row',
        //backgroundColor: 'pink'
    },
    subTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        //backgroundColor: 'green',
    },
    subTitleBackgrnd: {
        backgroundColor: '#E5EBFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    subTitleText: {
        color: '#485460',
        fontSize: 15,
        fontWeight: '700',
    },
    subCont: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'center',
        //backgroundColor: 'yellow'
    },
    detailInfo: {
        flex: 4,
        borderWidth: 0.2,
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 20,
        //backgroundColor: 'blue'
    },
    detailTitle: {
        flex: 1,
        marginVertical: 15,
        //backgroundColor: 'yellow'
    },
    detailCont: {
        flex: 7,
        //backgroundColor: 'pink'
    },
    detailText: {
        color: '#485460',
        fontSize: 15,
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