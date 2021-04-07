import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

axios.defaults.withCredentials = true;

const errorMsg = 'Oops! Something went wrong, please try again later. ';

function checkStatus(error) {
  const { response } = error;
  if (!response) {
    message.error({
      content: errorMsg,
      duration: 5,
      top: 50,
    });
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.data.message;
  }
  // navigate('404');
  return Promise.reject(response);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(getAccessTokenSilently) {
  return async (url, options) => {
    const defaultOptions = {
      withCredentials: true,
    };
    try {
      const token = await getAccessTokenSilently();
      options = {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } catch {
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
          'Content-Type': 'multipart/form-data',
          ...newOptions.headers,
        };
      }
    }
    // return axios(
    //   overrideUrl || url, { ...newOptions, params: { ...overrideParams, ...newOptions.params } },
    // );
    return axios(
      url, newOptions,
    )
      .then((response) => {
        if (newOptions.method === 'DELETE' || response.status === 204) {
          return response;
        }
        return response;
      })
      .then(({ data }) => (!data ? {} : data))
      .catch(checkStatus);
  };
}
