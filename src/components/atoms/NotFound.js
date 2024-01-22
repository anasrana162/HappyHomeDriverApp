import {View, Text, Dimensions} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('screen');

const NotFound = ({item}) => {
  return (
    <View
      style={{
        width: width - 30,
        height: height,
        alignItems: 'center',
      }}>
      <Text style={{color: 'grey', fontSize: 15}}>
        Your searched book is not found:{' '}
        <Text style={{fontWeight: '600', textTransform: 'capitalize'}}>
          {item}
        </Text>
      </Text>
    </View>
  );
};

export default NotFound;
