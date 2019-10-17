import axios from 'axios';
import { defaultUrl } from '../config';

export const authentication = (login, password) => {
  return axios({
    method: 'post',
    url: `${defaultUrl}/auth`,
    data: {
      login: login,
      password: password
    }
  });
};

export const getUser = token => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/user`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};
