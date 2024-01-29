import axios from 'axios';
import {api, baseURL} from '../utils/axiosInstance';
import {failedToast, successToast} from '../utils/handlers';

const handleApiError = (error, toast = false) => {
  if (error.response) {
    console.log('API Error - Response Data:', error.response.data);
    {
      toast && failedToast(error.response.data?.message);
    }

    if (error.response.status === 401) {
      console.log('Unauthorized Error');
    } else if (error.response.status === 403) {
      {
        toast && failedToast('Authentication Failed');
      }
    }
  } else if (error.request) {
    console.error('API Error - No Response Received:', error.request);
  } else {
    console.error('API Error - Request Setup Error:', error.message);
  }
};

export const authApi = async (endPoint, params, toast) => {
  try {
    const res = await api.post(`${baseURL}${endPoint}`, params);
    {
      toast && successToast(res.data?.message);
    }
    return res.data;
  } catch (error) {
    handleApiError(error, toast);
  }
};

export const postApi = async (endPoint, params, token) => {
  try {
    const res = await axios.post(`${baseURL}${endPoint}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res?.data;
  } catch (error) {
    console.log('Post Api Error: ', error);
    // return failedToast(error);
  }
};

export const allOrders = async () => {
  // https://happyhomeksa.com/wp-json/wc/v3/orders?per_page=100&consumer_key=ck_5d4c176606[…]&consumer_secret=cs_0ac5a1025944f0b9b0b0ee606b3ff6d4817807c2
  try {
    const params = {
      consumer_key: 'ck_5d4c1766060ed5681402f73dd027a4a5a507ea1c',
      consumer_secret: 'cs_0ac5a1025944f0b9b0b0ee606b3ff6d4817807c2',
      per_page:100,
      _fields:
        'id,status,currency,date_created,discount_total,shipping_total,total,total_tax,billing.first_name,billing.last_name,billing.address_1,billing.phone,shipping.first_name,shipping.last_name,shipping.address_1,shipping.phone,payment_method_title,line_items',
    };

    const res = await axios.get(
      'https://happyhomeksa.com/wp-json/wc/v3/orders',
      {params},
    );
    return res?.data;
  } catch (error) {
    // handleApiError(error);
    console.log('allOrders', error);
  }
};
