// [ 식재료 추가 바코드 스캐너 ]
import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MainTabContext } from '../mainTab';
import { Camera, CameraType, CameraScreen } from 'react-native-camera-kit';


const Scanner = ({route, navigation}) => {
    console.log(route.params.prevScreen);
    const [barcodeNum, setBarcodeNum] = useState(''); // 바코드 번호
    const [scaned, setScaned] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        // 종료후 재시작을 했을때 초기화
        setScaned(true);
        }, []);
    
    const moveToBack = (previous) => {
        if (previous === "add"){
            navigation.navigate('AddList', {barcodeNum: barcodeNum});
        } else if (previous === "modify"){
            navigation.navigate('FoodInfoModify', {barcodeNum: barcodeNum});
        }
        console.log('ASADASDFSDFSD')
    }
    const onBarCodeRead = (bcdvalue) => {
        if (!scaned) return;
        setScaned(false);
        //Vibration.vibrate(); // 안됨 ==> 나중에 확인
        Alert.alert("QR Code", bcdvalue, [
            { text: "OK", onPress: () => {
                setScaned(true);
                moveToBack(route.params.prev);                
            } },
        ]);
        };

  // 렌더링 영역    
  return (
    <View style={styles.container}>
        {/* <CameraScreen style={styles.scanner}
            // Barcode props
            scanBarcode={true}
            onReadCode={() => console.log('Barcode Scanned!!')} // optional
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor='blue' // (default red) optional, color of laser in scanner frame
            frameColor='skyblue' // (default white) optional, color of border of scanner frame
        /> */}
        <CameraScreen
            style={styles.scanner}
            ref={ref}
            cameraType={CameraType.Back} // Front/Back(default)
            zoomMode
            focusMode
            // Barcode Scanner Props
            scanBarcode={true}
            showFrame={true}
            laserColor="rgba(0, 0, 0, 0)"
            //frameColor="rgba(0, 0, 0, 0)"
            frameColor='blue'
            surfaceColor="rgba(0, 0, 0, 0)"
            //onReadCode={onBarCodeRead}
            onReadCode={(event) => {
                onBarCodeRead(event.nativeEvent.codeStringValue);
                setBarcodeNum(event.nativeEvent.codeStringValue);
            }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scanner: {
        flex: 1,
    }
});

export default Scanner;