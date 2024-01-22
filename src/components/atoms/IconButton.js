import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { COLOR } from '../../assets';
import { globals } from '../../styles/gobalStyles';

const IconButton = ({ icon, onPress, rotate }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={icon}
        style={[{ width: 20, height: 20, tintColor: COLOR.primary }, rotate]}
      />
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
