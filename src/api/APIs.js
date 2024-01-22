import {loginUser} from '../redux/authSlice';
import {api} from '../utils/axiosInstance';
import {successToast} from '../utils/handlers';
import {getApi} from './get';
import {authApi, postApi} from './post';

export const login = async (username, password, dispatch) => {
  const params = {username, password};
  const res = await authApi('jwt-auth/v1/token', params);
  return res;
};

export const resetPassword = async email => {
  const params = {email: email};
  const res = await authApi('bdpwr/v1/reset-password', params);
  return res;
};

export const createNewPassword = async (email, code, newPassword) => {
  const params = {
    email: email,
    code: code,
    password: newPassword,
  };
  // console.log(params, '-------------createNewPassword');
  const res = await authApi('bdpwr/v1/set-password', params, (toast = true));
  return res;
};

export const driverProfile = async token => {
  const res = await getApi('wp/v2/driver_profile', token);
  return res;
};

export const updateProfile = async (params, token) => {
  try {
    const res = await postApi('wp/v2/updatedriver', params, token);
    console.log('update Profile Succes:', res);

    successToast(res?.response?.message);
    return res;
  } catch (error) {
    console.log('update Profile Error:', error);
  }
};

export const driverStatus = async (params, token) => {
  try {
    const res = await postApi('wp/v2/ddfwm_availability', params, token);
    console.log('Driver Status Succes:', res);

    return res?.response;
  } catch (error) {
    console.log('Driver Status Error:', error);
  }
};

export const updateOrder = async (params, token) => {
  try {
    const res = await postApi(
      'wp/v2/driver_update_order_status',
      params,
      token,
    );
    console.log('Driver Status Succes:', res);

    return res?.response;
  } catch (error) {
    console.log('Update Order Status Error:', error);
  }
};

export const driverOrders = async token => {
  const res = await getApi('wp/v2/driver_orders', token);
  return res;
};
