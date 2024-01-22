import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ASSETS, COLOR } from '../../assets';
import LongButton from '../atoms/LongButton';

const PickerBox = ({ onPress1, onPress2, setIsVisible, isVisible }) => {
  return (
    <View style={styles.main}>
      <LongButton
        w="93%"
        title="Launch Camera"
        bg={COLOR.black}
        // icon={ASSETS.camera}
        onPress={onPress1}
      />
      <LongButton
        w="93%"
        title="Pick from Gallery"
        bg={COLOR.black}
        // icon={ASSETS.picture}
        onPress={onPress2}
      />
      <LongButton
        w="30%"
        title="Cancel"
        bg="transparent"
        color={COLOR.black}
        // icon={ASSETS.picture}
        onPress={() => setIsVisible(!isVisible)}
      />
    </View>
  );
};

export default PickerBox;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowOpacity: 0.5,
    zIndex: 999,
    height: 190,
    width: '100%',
    padding: 20,
    borderColor: COLOR.black,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    // rowGap: 10,
    // paddingTop: 30,
  },
});
