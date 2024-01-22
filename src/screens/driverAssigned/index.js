import {FlatList, View} from 'react-native';
import React from 'react';
import OrderComponent from '../../components/molecules/OrderComponent';
import OrderHeader from '../../components/molecules/OrderHeader';
import {order} from '../../assets/dummyData';
import {globals} from '../../styles/gobalStyles';

const DriverAssigned = () => {
  return (
    <View style={globals.mainWrpr}>
      <OrderHeader title="Driver Assigned" />
      <FlatList
        data={order}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => (
          <OrderComponent
            data={item}
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

export default DriverAssigned;
