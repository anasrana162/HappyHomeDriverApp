import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../assets';

const EffectButton = ({title, onPress, width, fontSize, loader}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()} disabled={loader}>
      <View style={[styles.container, {width: width}]}>
        {loader ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={{color: COLOR.white, fontSize: fontSize}}>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EffectButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});
