import { getUser, authentication, getReport } from '../api/axios';
import { connect } from '../api/webSockets';
import * as actions from './actions';
import TokenStorage from '../api/token';
import { history } from '../index';

export const handleCheckCurrentUser = () => dispatch => {
  const token = TokenStorage.getItemFromLocalStorage();

  if (!token) return history.push('/');

  dispatch(actions.getUserRequest());
  getUser(token)
    .then(response => {
      dispatch(actions.getUserSuccess(response.data));
      connect();
      return history.push('/chat');
    })
    .catch(({ message }) => dispatch(actions.getUserFailure(message)));
};

export const handleAuthentication = (login, password, callBack) => dispatch => {
  dispatch(actions.authRequest());
  authentication(login, password)
    .then(response => {
      const { token } = response.data;
      TokenStorage.setItemInLocalStorage(token);
      dispatch(actions.authSuccess());
      dispatch(handleCheckCurrentUser());
      callBack && callBack();
    })
    .catch(error => {
      dispatch(actions.authFailure(error.response.data.message));
    });
};

export const handleGettingReport = () => dispatch => {
  dispatch(actions.getReportRequest);
  const token = TokenStorage.getItemFromLocalStorage();
  getReport(token)
    .then(response => {
      dispatch(actions.getReportSuccess(response.data.report));
    })
    .catch(error => {
      console.log(error);
      dispatch(actions.getReportFailure(error));
    });
};
