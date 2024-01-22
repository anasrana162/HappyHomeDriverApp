import {FlatList, StyleSheet,  View} from 'react-native';
import React from 'react';
import OrderHeader from '../../components/molecules/OrderHeader';
import {order} from '../../assets/dummyData';
import OrderComponent from '../../components/molecules/OrderComponent';
import {globals} from '../../styles/gobalStyles';

const FailedDelivery = () => {
  return (
    <View style={globals.mainWrpr}>
      <OrderHeader title="Failed Delivery" />
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

export default FailedDelivery;

const styles = StyleSheet.create({});
