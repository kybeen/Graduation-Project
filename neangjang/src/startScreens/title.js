// [ 타이틀 화면 ]

 import React from 'react';
 import {View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
 
//  const callFetch = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((data) => console.log(data[0].id))
// }
 
 const TitleScreen = ({navigation}) => {
     return(
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <View>
                <Text style={styles.title}>냉장고</Text>
             </View>
             <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.start}>화면을 터치하여 시작</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={callFetch}>
                    <Text>fetch</Text>
                </TouchableOpacity> */}
             </View>
         </View>
     );
 };

 const styles = StyleSheet.create({
     title: {
         fontSize: 60,
         fontWeight: '600',
         marginBottom: 400,
     },
     start: {
         fontSize: 20,
         marginTop: -200,
         color: '#007AFF'
     }
 });
 
 export default TitleScreen;
 