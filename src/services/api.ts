/* eslint-disable prettier/prettier */
import request from '@/utils/request';

export interface IUserInfo {
  username: string;
}

interface IRes<T> {
  data: T;
  respCode: number;
  respMessage: string;
  success: boolean;
}

const apiPrefix = '/api';

const api = {
  getUserInfo: (params: IUserInfo) => request<IRes<{ userId: string }>>(`${apiPrefix}/useinfo`, { params }),
};

export default api;
