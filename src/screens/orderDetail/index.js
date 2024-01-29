import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { globals } from '../../styles/gobalStyles';
import Box from '../../components/atoms/Box';
import { ASSETS, COLOR, screenWidth } from '../../assets';
import OrderHeader from '../../components/molecules/OrderHeader';
import LongButton from '../../components/atoms/LongButton';
import { callHandler, whatsappHandler } from '../../utils/handlers';
import BoxHeading from '../../components/atoms/BoxHeading';
import SectionText from '../../components/atoms/SectionText';
import { selectUser } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { updateOrder } from '../../api/APIs';
import { selectLanguage } from '../../redux/languageSlice';

const OrderDetail = ({ route, navigation }) => {
  const [loader, setLoader] = useState(false);
  const [loaderCancelBtn, setLoaderCancelBtn] = useState(false);
  const [priceAllProducts, setPriceAllProducts] = useState();

  const [user] = useSelector(selectUser);
  const loadLang = useSelector(selectLanguage);
  const { title, item } = route?.params;
  const {
    id,
    total,
    status,
    currency,
    total_tax,
    date_created,
    discount_total,
    shipping_total,
    payment_method_title,
    shipping,
    billing,
    line_items,
    refunds, //add in api parameter
  } = item;

  const { first_name, last_name, address_1, address_2, city,phone } = billing;


  console.log('Billing :>> ', item?.line_items);

  const subTotal = line_items
    .map(item => item?.subtotal || 0)
    .reduce((acc, price) => acc + JSON.parse(price), 0);

  console.log(title, '------ORDER-----', id);

  const leftBtnHandler = async () => {
    setLoaderCancelBtn(true);
    const params = {
      order_id: id,
      status: 'failed_attempt',
    };
    const res = await updateOrder(params, user?.token);
    if (res || !res) {
      setLoaderCancelBtn(false);
    }
    console.log('leftBtnHandler-----------', res);
  };

  const rightBtnHandler = async () => {
    setLoader(true);
    const params = {
      order_id: id,
      status: title === 'Driver Assigned' ? 'out_for_delivery' : 'delivered',
    };
    const res = await updateOrder(params, user?.token);
    if (res || !res) {
      setLoader(false);
    }
    console.log(params, '-----------rightBtnHandler-----------', res);
  };
  const as = loadLang === 'ar' ? 'flex-end' : 'flex-start';

  return (
    <View style={globals.mainWrpr}>
      <OrderHeader title={`#${id}`} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 25,
          width: screenWidth(),
        }}>
        {/* INFO */}
        <Box>
          <BoxHeading heading="Info" icon={ASSETS.info} />
          <View style={[{ alignSelf: as }, styles.sectionWrpr]}>
            <SectionText title="Date" info={date_created} coln={true} />
            <SectionText title="Status" info={status} coln={true} />
            <SectionText
              title="Payment Method"
              info={payment_method_title}
              coln={true}
            />
            <SectionText
              title="Total"
              info={`${total} ${currency}`}
              coln={true}
            />
          </View>
        </Box>
        {/* Shipping */}
        <Box>
          <BoxHeading heading="Shipping Address" icon={ASSETS.map} />
          <View style={[{ alignSelf: as }, styles.sectionWrpr]}>
            <SectionText
              info={`${shipping?.first_name} ${shipping?.last_name}`}
            />
            <SectionText info={shipping?.address_1} />
          </View>

          {status === 'out-for-delivery' && (
            <LongButton
              title="Map"
              icon={ASSETS.map}
              onPress={() =>
                navigation.navigate('Map', { address: shipping?.address_1 })
              }
            />
          )}
        </Box>
        {/* Pickup */}
        <Box>
          <BoxHeading heading="Pickup Address" icon={ASSETS.shop} />
          <View style={[styles.sectionWrpr, { alignSelf: as }]}>
            <SectionText info="Happy Home DHA Phase:2" />
          </View>
          {status === 'out-for-delivery' && (
            <LongButton title="Navigate" icon={ASSETS.navigate} />
          )}
        </Box>
        {/* Customer */}
        <Box>
          <BoxHeading heading="Customer" icon={ASSETS.user} />
          <View style={[styles.sectionWrpr, { alignSelf: as }]}>
            <SectionText info={`${first_name} ${last_name}`} />
            <SectionText info={phone} />
          </View>
          <View style={styles.multiBtnWrpr}>
            <LongButton
              title="Call"
              icon={ASSETS.call}
              bg={COLOR.blue}
              w="48%"
              onPress={() => {
                console.log("phone sent", phone);
                callHandler(phone)
              }}
            />
            <LongButton
              title="Whatsapp"
              icon={ASSETS.whatsapp}
              bg={COLOR.green}
              w="48%"
              onPress={() => {
                console.log("phone sent", phone);
                whatsappHandler(phone)
              }}
            />
          </View>
        </Box>
        {/* Billing Address */}
        <Box>
          <BoxHeading heading="Billing Address" icon={ASSETS.bill} />
          <View style={[styles.sectionWrpr, { alignSelf: as }]}>
            <SectionText info={`${first_name} ${last_name}`} />
            <SectionText info={address_1} />
          </View>
        </Box>
        {/* Products */}
        <Box>
          <BoxHeading heading="Products" icon={ASSETS.basket} />
          <View
            style={[
              styles.multiBtnWrpr,
              {
                flexDirection: loadLang === 'ar' ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                marginTop: 14,
              },
            ]}>
            <SectionText title="Item" />
            <SectionText title="Total" />
          </View>
          {line_items.map((item, index) => {
            console.log(item?.price, 'item?.price');
            return (
              <Product
                image={item?.image?.src}
                name={`${item?.name} / ${item?.quantity}`}
                price={item?.subtotal}
                key={index}
                lang={loadLang}
              />
            );
          })}
        </Box>
        {/* Total Calculation */}
        <Box bg="transparent">
          <BoxHeading heading="Subtotal" rate={subTotal.toFixed(2)} />
          <BoxHeading heading="Discount" rate={discount_total} />
          <BoxHeading heading="Shipping" rate={shipping_total} />
          <BoxHeading heading="Total Tax" rate={`${total_tax}`} bbw={1} />
          {/* <BoxHeading heading="Refund" rate={refund?.total} bbw={1} /> */}
          <BoxHeading heading="Net Total" rate={`${total} ${currency}`} />
        </Box>
        {/* Driver */}
        <Box>
          <BoxHeading heading="Driver" icon={ASSETS.driver} />
          <View style={[styles.sectionWrpr, { alignSelf: as }]}>
            <SectionText
              title="Name"
              info={user?.user_display_name}
              coln={true}
            />
          </View>
        </Box>
      </ScrollView>

      {/* Accept & Cancel Buttons */}
      {title !== 'Delivered' && title !== 'Failed Delivery' && (
        <View
          style={[
            styles.multiBtnWrpr,
            {
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderWidth: 1,
              bottom: 0,
              borderColor: '#ddd',
              backgroundColor: '#fff',
            },
          ]}>
          <LongButton
            title={title === 'Driver Assigned' ? 'Unassign' : 'Cancelled'}
            onPress={leftBtnHandler}
            icon={ASSETS.cancelled}
            bg={COLOR.darkGrey}
            loader={loaderCancelBtn}
            w="48%"
          />
          <LongButton
            title={
              title === 'Driver Assigned' ? 'Out for Delivery' : 'Delivered'
            }
            onPress={rightBtnHandler}
            icon={
              title === 'Driver Assigned' ? ASSETS.courier : ASSETS.delivered2
            }
            loader={loader}
            w="48%"
          />
        </View>
      )}
    </View>
  );
};

export default OrderDetail;

const Product = ({ image, name, price, lang }) => (
  <View
    style={[
      styles.productContainer,
      { flexDirection: lang === 'ar' ? 'row-reverse' : 'row' },
    ]}>
    <View
      style={[
        styles.productTitle,
        { flexDirection: lang === 'ar' ? 'row-reverse' : 'row' },
      ]}>
      <Image source={{ uri: image }} style={styles.productImg} />
      <SectionText info={name} fz={12} />
    </View>
    <SectionText info={price} />
  </View>
);

const styles = StyleSheet.create({
  sectionWrpr: { marginTop: 8 },
  multiBtnWrpr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  productContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  productTitle: { alignItems: 'center', width: '65%' },
  productImg: { height: 45, width: 45, borderRadius: 5 },
});
