import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globals} from '../../styles/gobalStyles';
import {order} from '../../assets/dummyData';
import OrderComponent from '../../components/molecules/OrderComponent';
import OrderHeader from '../../components/molecules/OrderHeader';

const Delivery = ({route}) => {
  console.log(route?.params?.data, '=======================Delivery');
  return (
    <View style={globals.mainWrpr}>
      <OrderHeader title="Delivered" />
      <FlatList
        data={order}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => (
          <OrderComponent
            customerName={item?.customerName}
            orderNo={item?.orderNo}
            address={item?.address}
            index={index}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default Delivery;

const styles = StyleSheet.create({});
