import axios from 'axios';
// 'https://wpstaging.a2zcreatorz.com/Happy-home/wp-json/';
export const baseURL = 'https://happyhomeksa.com/wp-json/';
// https://happyhomeksa.com/
export const api = axios.create({
  baseURL: 'https://happyhomeksa.com/wp-json/',
});

// api.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     // console.error('API Error: ~~~', error);
//     return Promise.reject(error);
//   },
// );
