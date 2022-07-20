import axios, { AxiosRequestConfig } from 'axios';
import { getConfig } from '@/utils/config';
import { message } from 'antd';

const config = getConfig();

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;',
  },
});

console.log('instance======>', instance);

instance.interceptors.request.use((config) => {
  // todo
  // const token = sessionStorage.getItem('token');
  // if (token) {
  //   config.headers.token = `Bearer ${token}`;
  // }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data?.respCode === 10000000) {
      return [true, response.data];
    } else {
      return [false, response.data];
    }
  },
  function (error) {
    return [false, error.response];
  },
);

interface IRequest {
  <T = any, D = any>(url: string, config?: AxiosRequestConfig): Promise<[boolean, T, D]>;
}
const request: IRequest = async (url, config) => {
  config = config || { method: 'get' };
  config.url = url;
  const result = (await instance.request(config)) as any;
  const [success, data] = result as any;
  // alert(success + JSON.stringify(data));
  try {
    if (!success) {
      const errMsg = (data.respMessage || data.data.errmsg || '') + '请重试！';
      message.error(errMsg);
    }
  } catch (error) {}
  return [success, data, result];
};

export default request;
