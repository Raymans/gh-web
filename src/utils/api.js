import config from '../../content/meta/config'
import request from '../utils/request';

export async function signup(params) {
  return request(`${config.ghServiceUrl}/api/users`,{
    method: 'POST',
    data: params
  });
}
export async function getUser(params) {
  return request(`${config.ghServiceUrl}/api/users`,{
    method: 'GET',
    data: params
  });
}

export function getUserUrl() {
  return {
    authUrl: `${config.ghServiceUrl}/api/users/${localStorage.getItem('userid')}`,
    reqOptions: {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      }, }
  };
}
