import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { isAuthenticated } from './auth';

axios.defaults.withCredentials = true;

// eslint-disable-next-line no-underscore-dangle
let _localStorage;
if (typeof window !== 'undefined' && window) {
  _localStorage = localStorage;
} else {
  const localStorageMemory = require('localstorage-memory');
  _localStorage = localStorageMemory;
}

const errorMsg = 'Oops! Something went wrong, please try again later. ';

function checkStatus(error) {
  const { response } = error;
  if (!response) {
    message.error({ content: errorMsg, duration: 5, top: 50 });
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.data.message;
  }
  return Promise.reject(error);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    withCredentials: true,
  };

  if (isAuthenticated()) {
    options = {
      ...options,
      headers: {
        Authorization: `Bearer ${_localStorage.getItem('accessToken')}`,
      },
    };
  }
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST'
    || newOptions.method === 'PUT'
    || newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      if (newOptions.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        newOptions.data = qs.stringify(newOptions.data);
      } else {
        newOptions.data = JSON.stringify(newOptions.data);
      }
    } else {
      // newOptions.data is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return axios(url, newOptions)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response;
      }
      return response;
    })
    .then(({ data }) => data)
    .catch(checkStatus);
}
