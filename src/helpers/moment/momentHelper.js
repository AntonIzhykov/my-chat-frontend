import moment from 'moment';

export const createMinDate = arrayOfDates => {
  return moment.min(arrayOfDates).format('DD-MM-YYYY:HH-mm');
};

export const createMaxDate = arrayOfDates => {
  return moment.max(arrayOfDates).format('DD-MM-YYYY:HH-mm');
};
