// [ 세팅화면 - 알림 설정 ]
import React, { useState } from 'react';
import { Camera, CameraType, CameraScreen } from 'react-native-camera-kit';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const NoticeSetting = ({navigation}) => {
  return (
    <View>
      <CameraScreen
  actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
  onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
  // flashImages={{
  //   // optional, images for flash state
  //   on: require('path/to/image'),
  //   off: require('path/to/image'),
  //   auto: require('path/to/image'),
  // }}
  // cameraFlipImage={require('path/to/image')} // optional, image for flipping camera button
  // captureButtonImage={require('path/to/image')} // optional, image capture button
  // torchOnImage={require('path/to/image')} // optional, image for toggling on flash light
  // torchOffImage={require('path/to/image')} // optional, image for toggling off flash light
  hideControls={false} // (default false) optional, hides camera controls
  showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
/>
      {/* <Camera
          ref={(ref) => (this.camera = ref)}
          cameraType={CameraType.Back} // front/back(default)
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({

});

export default NoticeSetting;