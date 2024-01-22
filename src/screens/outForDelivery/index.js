import {FlatList, View} from 'react-native';
import React from 'react';
import OrderComponent from '../../components/molecules/OrderComponent';
import OrderHeader from '../../components/molecules/OrderHeader';
import {globals} from '../../styles/gobalStyles';
import {navigation} from '../../assets';

const OutforDelivery = ({route}) => {
  const {data, title} = route?.params;
  const customNav = navigation();
  // const moveToDetailScreen = () => customNav.navigate('OrderDetail', {title, data});
  // console.log(data, '==============OrderComponent');

  return (
    <View style={globals.mainWrpr}>
      <OrderHeader title={title} />
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => (
          <OrderComponent
            orderNo={item?.id}
            customerName={`${item?.billing?.first_name} ${item?.billing?.last_name}`}
            onPress={() => customNav.navigate('OrderDetail', {title, item})}
            address={item?.billing?.address_1}
            index={index}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default OutforDelivery;
