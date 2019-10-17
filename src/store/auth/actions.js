import * as con from './constants';

export const authRequest = () => ({
  type: con.AUTH_REQUEST
});

export const authSuccess = () => ({
  type: con.AUTH_SUCCESS
});

export const authFailure = error => ({
  type: con.AUTH_FAILURE,
  payload: error
});

export const getUserRequest = () => ({
  type: con.GET_USER_REQUEST
});

export const getUserSuccess = user => ({
  type: con.GET_USER_SUCCESS,
  payload: user
});

export const getUserFailure = error => ({
  type: con.GET_USER_FAILURE,
  payload: error
});

export const setOnline = () => ({
  type: con.SET_ONLINE
});

export const setOffline = () => ({
  type: con.SET_OFFLINE
});

export const userLeftChat = () => ({
  type: con.USER_LEFT_CHAT
});

export const setLoadingTrue = () => ({
  type: con.LOADING_IS_TRUE
});

export const setLoadingFalse = () => ({
  type: con.LOADING_IS_FALSE
});

export const getReportRequest = () => ({
  type: con.GET_REPORT_REQUEST
});

export const getReportSuccess = report => ({
  type: con.GET_REPORT_SUCCESS,
  payload: report
});

export const getReportFailure = error => ({
  type: con.GET_REPORT_FAILURE,
  payload: error
});
