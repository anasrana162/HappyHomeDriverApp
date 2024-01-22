import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

const GoBackButton = ({onpress}) => {
const navigation = useNavigation();

  return (
    <View style={{marginVertical: 15, marginLeft: -5}}>
    <TouchableWithoutFeedback onPress={() => navigation.pop()} >
      <Svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M19 12.5601H5"
          stroke="#1F2223"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 19.5601L5 12.5601L12 5.56006"
          stroke="#1F2223"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </TouchableWithoutFeedback>
  </View>
  )
}

export default GoBackButton