import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from 'components';
import CryptoJS from 'crypto-js';
import utils from './utils';

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_SECRET = import.meta.env.VITE_APP_SECRET;

const generateToken = () => {
  const time = Date.now();
  const md5 = CryptoJS.MD5(`${APP_ID}${time}${APP_SECRET}`).toString(CryptoJS.enc.Hex);
  const encodedString = CryptoJS.enc.Utf8.parse(`${APP_ID},${md5},${time}`);
  const b64 = CryptoJS.enc.Base64.stringify(encodedString);
  return b64;
};

const baseURL = import.meta.env.VITE_API_URL;

const http = axios.create({ baseURL });

http.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
  const httpConfig = { ...axiosConfig };
  if (httpConfig?.headers) {
    httpConfig.headers.Authorization = generateToken();
    const userToken = utils.getToken();
    if (userToken && !['null', 'undefined'].includes(userToken)) {
      httpConfig.headers['User-Token'] = userToken;
    }
    httpConfig.headers.Locale = utils.getLang();
  }
  return httpConfig;
});

http.interceptors.response.use(res => res, error => {
  if (error.response) {
    const { code } = error.response.data;
    if (code === 500) {
      Toast({ message: error.response.data.messages[0], type: 'error' });
    } else if (code === 403) {
      utils.logout();
    }
  }
  return Promise.reject(error);
});

export default http;
