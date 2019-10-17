import axios from 'axios';
import { defaultUrl } from '../config';

export const getRooms = () => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/rooms`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
