import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { navigate } from 'gatsby-plugin-intl';

axios.defaults.withCredentials = true;

const errorMsg = 'Oops! Something went wrong, please try again later. ';

function checkStatus(error, request) {
  const { response } = error;
  if (!response) {
    message.error({
      content: errorMsg,
      duration: 5,
      top: 50
    });
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.data.message;
  }
  if (response.status === 404) {
    navigate('/404');
  }
  if (response.status === 401) {
    return request();
  }
  return Promise.reject(response);
}

export default function request(getAccessTokenSilently, tokens = {
  accessToken: '',
  userKey: ''
}) {
  const _request = async (url, options, ignoreCache = false) => {
    const defaultOptions = {
      withCredentials: true
    };
    try {
      const token = await getAccessTokenSilently({ ignoreCache });
      options = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      };
    } catch {
      if (tokens.accessToken) {
        options = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${tokens.accessToken}`,
            'x-user-key': tokens.userKey
          }
        };
      }
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
          ...newOptions.headers
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
          ...newOptions.headers
        };
      }
    }
    // return axios(
    //   overrideUrl || url, { ...newOptions, params: { ...overrideParams, ...newOptions.params } },
    // );
    return axios(
      url, newOptions
    )
      .then((response) => {
        if (newOptions.method === 'DELETE' || response.status === 204) {
          return response;
        }
        return response;
      })
      .then(({ data }) => (!data ? {} : data))
      .catch((e) => checkStatus(e, _request.bind(this, url, options, true)));
  };
  return _request;
}
