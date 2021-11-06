import { http, utils } from 'helpers';
import { LoginData, UserAccount } from './interfaces';

const api = {
  login(data: LoginData) {
    return utils.apiHandler<UserAccount>(http.post('auth/login', data));
  },
};

export default api;
