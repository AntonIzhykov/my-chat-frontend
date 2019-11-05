import { errorHandler } from '../../helpers/alerts/index';

export const getMessage = error => {
  console.log({ error });
  if (error && error.message) {
    return error.message;
  } else if (error && error.data && error.data.message) {
    return error.data.message;
  }
  if (!error || !error.response || !error.response.data || !error.response.data.message) {
    return 'An error has occured';
  } else {
    return error.response.data.message;
  }
};

const NotificationsMiddleWare = store => next => (action = {}) => {
  next(action);
  const { type, payload } = action;
  if (!type) return;
  if (type && type.endsWith('FAILURE')) {
    const message = getMessage(payload);
    store.dispatch(
      errorHandler({
        title: 'Error',
        message
      })
    );
  }
};
export default NotificationsMiddleWare;
