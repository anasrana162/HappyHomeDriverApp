import {View} from 'react-native';
import React from 'react';
import {screenWidth} from '../../assets';

const Box = ({children, fd, w, pv, mv, ph, bg, br, elv}) => {
  return (
    <View
      style={{
        width: w || screenWidth() - 30,
        paddingHorizontal: ph || 15,
        backgroundColor: bg || '#fff',
        flexDirection: fd || 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: pv || 15,
        marginVertical: mv || 5,
        borderRadius: br || 15,
        elevation: elv || 0,
      }}>
      {children}
    </View>
  );
};

export default Box;
