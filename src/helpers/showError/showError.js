import Swal from 'sweetalert2';
export const showError = (type, title, text, callback) => {
  Swal.fire({
    type,
    title,
    text
  }).then(() => callback && callback);
};
