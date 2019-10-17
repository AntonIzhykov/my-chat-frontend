import { getRooms, updateProfile } from '../api/axios';
import * as actions from './actions';
import TokenStorage from '../api/token';
import { showError } from '../../helpers/showError';

export const handleGettingRooms = () => dispatch => {
  dispatch(actions.getRoomsRequest());
  getRooms()
    .then(response => dispatch(actions.getRoomsSuccess(response.data.rooms)))
    .catch(error => dispatch(actions.getRoomsFailure(error)));
};

export const handleUpdatingProfile = userData => dispatch => {
  dispatch(actions.updateProfileRequest());
  const token = TokenStorage.getItemFromLocalStorage();
  updateProfile(token, userData)
    .then(() => dispatch(actions.updateProfileRSuccess()))
    .catch(error => {
      const errorMsg = error.response.data.message;
      showError('error', 'Error!', errorMsg);
      errorMsg ? dispatch(actions.updateProfileRFailure(errorMsg)) : console.log({ error });
    });
};
