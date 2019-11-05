import Notifications from 'react-notification-system-redux';

const defaultParams = {
  position: 'br',
  autoDismiss: 10
};

export function successHandler(dispatch, message, params = null) {
  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.success({
        ...defaultParams,
        title: 'Success!',
        message
      })
    );
}

export function infoHandler(dispatch, message, params = null) {
  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.info({
        ...defaultParams,
        title: 'Info!',
        message,
        ...params
      })
    );
}

export function warningHandler(dispatch, message, params = null) {
  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.warning({
        ...defaultParams,
        title: 'Warning!',
        message
      })
    );
}

export function errorHandler(params = {}) {
  return dispatch => {
    if (process.env.NODE_ENV !== 'test')
      dispatch(
        Notifications.error({
          ...defaultParams,
          ...params
        })
      );
  };
}
