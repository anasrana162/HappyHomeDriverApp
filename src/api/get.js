import axios from 'axios';
import {baseURL} from '../utils/axiosInstance';

export const getApi = async (endPoint, bearerToken) => {
  //   console.log(bearerToken, '===', endPoint);
  try {
    const res = await axios.get(`${baseURL}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return res?.data?.response;
  } catch (error) {
    console.log('GET Api Error: ', error);
  }
};
