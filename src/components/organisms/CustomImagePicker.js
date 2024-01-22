import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ASSETS, COLOR} from '../../assets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PickerBox from './PickerBox';

const CustomImagePicker = ({
  setIsVisible,
  isVisible,
  selectedImage,
  setSelectedImage,
}) => {
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [isVisible, setIsVisible] = useState(false);

  const handleCameraLaunch = async () => {
    setIsVisible(!isVisible);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: false,
    };
    try {
      const response = await launchCamera(options);

      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setSelectedImage(response.assets[0]);
        console.log('ImagePicker Select: ');
      }

      console.log(response, '==========response');
    } catch (error) {
      console.log('Error Camera: ', error);
    }
  };

  const handleGalleryLaunch = async () => {
    setIsVisible(!isVisible);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: false,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          activeOpacity={1}
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            position: 'absolute',
            right: 5,
            bottom: 35,
            zIndex: 1,
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={ASSETS.camera} style={{width: 18, height: 18}} />
        </TouchableOpacity>

        <View
          style={{
            marginBottom: 20,
            borderRadius: 100,
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: '#000',
            backgroundColor: '#eee',
            overflow: 'hidden',
          }}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage?.uri}}
              style={styles.selectedImage}
            />
          ) : (
            <Image
              source={ASSETS.picture}
              style={{width: 70, height: 70}}
              tintColor="#bbb"
            />
          )}
        </View>
      </View>
      {/* {isVisible && (
        <PickerBox
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onPress1={handleCameraLaunch}
          onPress2={handleGalleryLaunch}
        />
      )} */}
    </>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: COLOR.black,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
