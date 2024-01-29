import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  I18nManager,
  Modal,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import OrderStatus from '../../components/atoms/OrderStatus';

import { ASSETS, COLOR } from '../../assets';
import UserBar from '../../components/molecules/UserBar';
import Box from '../../components/atoms/Box';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { globals } from '../../styles/gobalStyles';
import { selectLanguage } from '../../redux/languageSlice';
import { selectUser } from '../../redux/authSlice';
import { driverOrders, driverProfile, driverStatus } from '../../api/APIs';
import { addSetting } from '../../redux/settingSlice';
import ToggleButton from '../../components/atoms/ToggleButton';
import { allOrders } from '../../api/post';
import Loader from '../../components/atoms/Loader';

const Home = ({ navigation, route }) => {
  // REDUX
  const loadLang = useSelector(selectLanguage);
  const [user] = useSelector(selectUser);
  const { t, i18n } = useTranslation();
  // const {token, user_display_name, user_email, user_nicename} = user;

  // STATES
  const [userStatus, setUserStatus] = useState(false);
  const [assignedOrders, setAssignedOrders] = useState();
  const [outForDelivery, setOutForDelivery] = useState();
  const [failedDelivery, setFailedDelivery] = useState();
  const [delivered, setDelivered] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleAvailability = async () => {
    setUserStatus(!userStatus);
    const statusParam = { status: userStatus ? 1 : 0 };
    const res = await driverStatus(statusParam, user?.token);
    if (res?.success === undefined) {
      setUserStatus(false);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(loadLang);
    handleAvailability();
    filterData();
  }, []);

  const filterData = async () => {
    try {
      const orderIDs = await driverOrders(user?.token);
      // console.log("orderIDs", orderIDs)
      const allOrderDetails = await allOrders();
      // console.log("allOrderDetails", allOrderDetails)
      if(allOrderDetails == undefined){
        setLoading(false);
        setRefreshing(false)
        return alert("Error Fetching Data please reload")
      }
      const filteredOrders1 = allOrderDetails.filter(order => {
        const data = orderIDs?.driver_assigned
          .map(i => JSON.parse(i.ID))
          .includes(order?.id);
        return data;
      });
      setAssignedOrders(filteredOrders1);
      const filteredOrders2 = allOrderDetails.filter(order => {
        const data = orderIDs?.out_for_delivery
        .map(i => JSON.parse(i.ID))
        .includes(order?.id);
        return data;
      });
      console.log("filteredOrders2 outfordelivery", filteredOrders2)
      setOutForDelivery(filteredOrders2);
      const filteredOrders3 = allOrderDetails.filter(order => {
        const data = orderIDs?.failed_attempt
          .map(i => JSON.parse(i.ID))
          .includes(order?.id);
        return data;
      });
      setFailedDelivery(filteredOrders3);
      const filteredOrders4 = allOrderDetails.filter(order => {
        const data = orderIDs?.delivered
          .map(i => JSON.parse(i.ID))
          .includes(order?.id);
        return data;
      });
      setDelivered(filteredOrders4);
      setLoading(false);
      setRefreshing(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // console.log(userStatus, '<<==========!userStatus===========');

  const todayEarnings = delivered
    ?.map(item => item?.total || 0)
    .reduce((acc, price) => acc + JSON.parse(price), 0);

    console.log("Loading",loading)
  return (
    <>
    
      <Loader visible={loading} />
      <View style={styles.main}>
        {/* {console.log("USerData",user)} */}
        <UserBar
          status={userStatus}
          title={user?.user_display_name}
          onPress={() => navigation.openDrawer()}
        />

        <ScrollView
          refreshControl={

            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true)
                filterData()
              }}
            />

          }
          contentContainerStyle={{ paddingTop: 10 }}>
          {/* Driver Status */}
          <ToggleButton
            lang={loadLang}
            isOn={userStatus}
            onToggle={handleAvailability}
            label={userStatus ? t('I am available') : t('I am unavailable')}
            onColor={COLOR.primary}
            offColor={COLOR.darkGrey}
            bg={COLOR.L_grey}
          />

          {/* Today Earnings */}
          <Box fd={loadLang === 'ar' ? 'row-reverse' : 'row'} bg={COLOR.L_grey}>
            <Text style={globals.fontReg}>{t('Today Earnings')}</Text>
            <Text style={[globals.fontBold, { fontSize: 15 }]}>
              {todayEarnings?.toFixed(2)} USD
            </Text>
          </Box>

          {/* ICONS */}
          <View style={styles.iconWrpr}>
            <OrderStatus
              title="Driver Assigned"
              icon={ASSETS.task}
              data={assignedOrders}
            />
            <OrderStatus
              title="Out for Delivery"
              icon={ASSETS.courier}
              data={outForDelivery}
            />
            <OrderStatus
              title="Failed Delivery"
              icon={ASSETS.decline}
              data={failedDelivery}
            />
            <OrderStatus
              title="Delivered"
              icon={ASSETS.delivered2}
              data={delivered}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  iconWrpr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});
