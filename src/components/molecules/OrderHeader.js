import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ASSETS, navigation, screenWidth} from '../../assets';
import IconButton from '../atoms/IconButton';
import {useTranslation} from 'react-i18next';
import {globals} from '../../styles/gobalStyles';
import {Direction} from '../../utils/handlers';

const OrderHeader = ({title}) => {
  const customNav = navigation();
  const goBack = () => customNav.goBack();
  const mapHandler = () => console.log('Map');
  const {t} = useTranslation();
  const direc = Direction();
  const rotateIcon =
    direc === 'row-reverse' ? globals.rotate0 : globals.rotate180;

  return (
    <View style={[styles.main, {flexDirection: direc}]}>
      <IconButton icon={ASSETS.arrow} onPress={goBack} rotate={rotateIcon} />
      <Text style={[globals.fontBold, {fontSize: 17}]}>{t(title)}</Text>
      <View />
      {/* <IconButton icon={ASSETS.map} onPress={mapHandler} /> */}
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth(),
  },
});
