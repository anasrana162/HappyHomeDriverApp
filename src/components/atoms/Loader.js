import {Image, Modal, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {ASSETS} from '../../assets';

const Loader = ({visible}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <StatusBar backgroundColor="#fff4" />
      <View style={styles.overlay}>
        <Image source={ASSETS.whiteLoader} style={styles.gif} />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  gif: {
    width: 70,
    height: 70,
  },
});
