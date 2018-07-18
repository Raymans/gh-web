import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs'
axios.defaults.withCredentials = true;

const codeMessage = {
  200: '服務器成功返回請求的數據。 ',
  201: '新建或修改數據成功。 ',
  202: '一個請求已經進入後台排隊（異步任務）。 ',
  204: '刪除數據成功。 ',
  400: '錯誤',
  401: '用戶沒有權限（令牌、用戶名、密碼錯誤）。 ',
  403: '用戶得到授權，但是訪問是被禁止的。 ',
  404: '發出的請求針對的是不存在的記錄，服務器沒有進行操作。 ',
  406: '請求的格式不可得。 ',
  410: '請求的資源被永久刪除，且不會再得到的。 ',
  422: '當創建一個對象時，發生一個驗證錯誤。 ',
  500: '服務器發生錯誤，請檢查服務器。 ',
  502: '網關錯誤。 ',
  503: '服務不可用，服務器暫時過載或維護。 ',
  504: '網關超時。 ',
};
function checkStatus(error) {
  const response = error.response;
  if (response.status >= 200 && response.status < 300) {
    return response.data.message;
  }

  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `${errortext}`,
    description: response.data? response.data.message: errortext,
  });
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
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      if(newOptions.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
        newOptions.data = qs.stringify(newOptions.data);
      }else{
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
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response;
      }
      return response;
    })
    .then(({data}) => data)
    .catch(checkStatus)
}
