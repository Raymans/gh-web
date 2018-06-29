import config from '../../content/meta/config'
import request from '../utils/request';

export async function signup(params) {
  return request(`${config.ghServiceUrl}/api/users`,{
    method: 'POST',
    data: params
  });
}
