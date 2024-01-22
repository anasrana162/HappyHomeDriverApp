import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Home from '../screens/home';
import DriverAssigned from '../screens/driverAssigned';
import OutforDelivery from '../screens/outForDelivery';
import FailedDelivery from '../screens/failedDelivery';
import Delivered from '../screens/delivered';
import OrderDetail from '../screens/orderDetail';
import Settings from '../screens/setting';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/authSlice';
import ForgotPassword from '../screens/forgetPassword';
import ResetPassword from '../screens/resetPassword';
import Map from '../screens/map';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animation: 'slide_from_right',
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DriverAssigned" component={DriverAssigned} />
      <Stack.Screen name="OutforDelivery" component={OutforDelivery} />
      <Stack.Screen name="FailedDelivery" component={FailedDelivery} />
      <Stack.Screen name="Delivered" component={Delivered} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animation: 'slide_from_right',
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [user] = useSelector(selectUser);
  console.log(user ? 'YES' : 'NO', '_______NAV USER______');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animation: 'slide_from_bottom',
      }}>
      {user ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
