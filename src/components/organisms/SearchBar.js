import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');
import Svg, {Path} from 'react-native-svg';

const SearchBar = ({searchHandler}) => {
  return (
    <View style={styles.wrpr}>
      <View style={styles.iconWrpr}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none">
          <Path
            d="M7.98156 14.413C11.7055 14.413 14.7243 11.5687 14.7243 8.06006C14.7243 4.55143 11.7055 1.70712 7.98156 1.70712C4.25764 1.70712 1.2388 4.55143 1.2388 8.06006C1.2388 11.5687 4.25764 14.413 7.98156 14.413Z"
            stroke="#122704"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M16.5223 14.4071L14.7242 12.713"
            stroke="#122704"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      </View>
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#000"
        onChangeText={searchHandler}
        style={{width: '88%', color:"#000"}}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  wrpr: {
    height: 45,
    width: width - 30,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 50,
    alignSelf: 'center',
  },
  iconWrpr: {width: '12%', justifyContent: 'center', alignItems: 'center'},
});
