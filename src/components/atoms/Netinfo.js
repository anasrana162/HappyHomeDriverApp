import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Netinfo = () => {
  return (
    <View style={styles.main}>
      <Image
        source={require('../../assets/images/netinfo.jpeg')}
        style={{width: 150, height: 150}}
      />
      <Text style={styles.infoTxt}>
        Network is disconnected{'\n'}Check your connection
      </Text>
    </View>
  );
};

export default Netinfo;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  },
  infoTxt: {color: '#000', textAlign: 'center', marginTop: -10},
});
