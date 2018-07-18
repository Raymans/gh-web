import config from '../../content/meta/config';
import request from '../utils/request';

let _localStorage;
if (typeof window !== 'undefined' && window) {
  _localStorage = localStorage;
} else {
  let localStorageMemory = require('localstorage-memory');
  _localStorage = localStorageMemory;
}

export async function signup(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'POST',
    data: params
  }).then(user => _localStorage.setItem('userid', user.id));
}

export async function login(params) {
  return request(`${config.ghServiceUrl}/api/oauth/token`, {
    method: 'POST',
    data: {...params, grant_type: 'password'},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Z2hmcm9udDpzZWNyZXQ='
    }
  }).then(user => _localStorage.setItem('userid', user.id));
}

export async function logout(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'POST',
    data: params
  }).then(user => _localStorage.removeItem('userid', user.id));
}

export async function getUser(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'GET',
    data: params
  });
}

export async function getQuestions(params) {
  return request(`${config.ghServiceUrl}/api/questions`, {
    method: 'GET',
    data: params
  });
}

export async function createQuestion(params) {
  return request(`${config.ghServiceUrl}/api/questions`, {
    method: 'POST',
    data: params
  });
}

export function getUserUrl() {
  return {
    authUrl: `${config.ghServiceUrl}/api/users/${_localStorage.getItem('userid')}`,
    reqOptions: {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      },
    }
  };
}
