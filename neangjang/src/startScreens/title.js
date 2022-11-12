// [ 타이틀 화면 ]

 import React from 'react';
 import {View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
 import Refri from 'neangjang/assets/icons/refrigerator.png'
 
//  const callFetch = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((data) => console.log(data[0].id))
// }
 
 const TitleScreen = ({navigation}) => {
     return(
         <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Login')}>
             <View style={styles.titleView}>
                <Image
                    source={Refri}
                    //style={{width:'100%',height:'100%', borderRadius: 15,}}
                />
                <Text style={styles.title}>냉장고</Text>
             </View>
             <View style={styles.startView}>
                <TouchableOpacity style={styles.start} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.startText}>화면을 터치하여 시작</Text>
                </TouchableOpacity>
             </View>
         </TouchableOpacity>
     );
 };

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E5EBFF'
    },
    titleView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 80,
        //backgroundColor: 'lightblue',
    },
    startView: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'pink',
    },
    title: {
        fontSize: 60,
        fontWeight: '600',
        color: '#545454',
        //fontFamily: 'MaruBuri-Bold',
        //marginBottom: 400,
    },
    start: {
        backgroundColor: '#E5EBFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        //borderWidth: 1,
    },
    startText: {
        fontSize: 15,
        fontWeight: '700',
        //marginTop: -200,
        //color: '#007AFF',
        color: '#545454',
    }
 });
 
 export default TitleScreen;
 