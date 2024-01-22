import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLOR, FONT, navigation, windowWidth } from '../../assets';
import { useTranslation } from 'react-i18next';
import { globals } from '../../styles/gobalStyles';

const OrderStatus = ({ title, icon, data }) => {
  const customNav = navigation();
  const titleWithoutSpaces = title.split(' ').join('');
  const navHandler = () => customNav.navigate('OutforDelivery', { title, data });
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={navHandler}
      style={styles.main}
      activeOpacity={0.7}>
      <Image source={icon} style={styles.icon} />
      <Text style={[globals.fontReg, { marginTop: 10 }]}>{t(title)}</Text>
      <View style={styles.counts}>
        <Text style={styles.total}>
          {t('Total')}: {data?.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  main: {
    margin: 10,
    height: 170,
    width: windowWidth() / 2.3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    overflow: "hidden"
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: COLOR.primary,
  },
  counts: {
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    bottom: -1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  total: {
    fontSize: 11,
    lineHeight: 20,
    color: COLOR.white,
    fontFamily: FONT.fontReg,
  },
});
