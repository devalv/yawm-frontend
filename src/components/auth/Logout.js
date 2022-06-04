import axios from 'axios';
import Cookies from 'js-cookie';

export const simpleLogout = () => {
  // This should be enough
  Cookies.remove('access_token');
  axios.defaults.headers.common.Authorization = null;
  window.location.reload();
};

