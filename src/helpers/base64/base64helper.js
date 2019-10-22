import { showError } from '../showError';
import imageDataURI from 'image-data-uri';

export const getBase64FromFile = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    cb(reader.result);
  };
  reader.onerror = function(error) {
    showError('error', 'Error', error);
  };
};

export const getBase64FromUrl = async url => {
  let img;
  if (!url.includes('data:image')) {
    await imageDataURI
      .encodeFromURL(url)
      .then(res => {
        img = res;
      })
      .catch(error => showError('error', 'Error', error));
  } else {
    img = url;
  }
  return img;
};
