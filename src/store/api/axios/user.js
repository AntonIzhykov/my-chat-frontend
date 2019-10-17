import axios from 'axios';
import { defaultUrl } from '../config';

export const updateProfile = (token, userData) => {
  return axios({
    method: 'patch',
    url: `${defaultUrl}/user`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    data: {
      userData
    }
  });
};

export const getReport = token => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/report`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};
