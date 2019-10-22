import { getRooms, updateProfile, loadTempImage } from '../api/axios';
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
    .then(response => dispatch(actions.updateProfileRSuccess(response.data)))
    .catch(error => {
      const errorMsg = error.response.data.message;
      showError('error', 'Error!', errorMsg);
      errorMsg ? dispatch(actions.updateProfileRFailure(errorMsg)) : console.log({ error });
    });
};

export const handleLoadingTempImage = (img, callback) => dispatch => {
  dispatch(actions.loadTempImageRequest());
  const token = TokenStorage.getItemFromLocalStorage();
  loadTempImage(token, img)
    .then(response => {
      dispatch(actions.loadTempImageSuccess());
      callback && callback(response.data);
    })
    .catch(error => {
      console.log(error);
      dispatch(actions.loadTempImageFailure(error));
    });
};
