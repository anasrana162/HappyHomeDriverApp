import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Box from '../atoms/Box';
import {COLOR} from '../../assets';
import {Direction, TextAlign} from '../../utils/handlers';
import {globals} from '../../styles/gobalStyles';

const OrderComponent = ({customerName, orderNo, address, index, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Box fd={Direction()}>
        <View style={styles.count}>
          <Text style={[globals.fontReg, styles.white12]}>{index + 1}</Text>
        </View>
        <View style={{width: '90%'}}>
          <View style={[styles.row, {flexDirection: Direction()}]}>
            <Text style={globals.fontBold}>{customerName}</Text>
            <Text style={[globals.fontBold, styles.orderNo]}>
              Order #{orderNo}
            </Text>
          </View>
          <Text
            style={[globals.fontReg, {textAlign: TextAlign(), fontSize: 12}]}>
            {address}
          </Text>
        </View>
      </Box>
    </TouchableOpacity>
  );
};

export default OrderComponent;

const styles = StyleSheet.create({
  count: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: '800',
    color: COLOR.black,
  },
  orderNo: {
    color: COLOR.darkGrey,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  black12: {
    color: COLOR.black,
    fontSize: 12,
  },
  white12: {
    color: COLOR.white,
    fontSize: 12,
  },
});
