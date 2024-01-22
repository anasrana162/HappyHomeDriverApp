import {TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLOR} from '../../assets';

const CircleButton = ({onPress, icon, wh, p, pd, t, r, b}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      backgroundColor: COLOR.white,
      justifyContent: 'center',
      alignItems: 'center',
      width: wh,
      height: wh,
      padding: pd,
      elevation: 5,
      borderRadius: 50,
      position: p,
      top: t,
      right: r,
      bottom: b,
      shadowColor: '#000',
      shadowOffset: {width: 5, height: 5},
      shadowRadius: 5,
    }}>
    <Image source={icon} style={{width: '100%', height: '100%'}} />
  </TouchableOpacity>
);

export default CircleButton;
