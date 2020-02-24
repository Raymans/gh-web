import config from '../../content/meta/config';
import request from './request';

let _localStorage;
if (typeof window !== 'undefined' && window) {
  _localStorage = localStorage;
} else {
  const localStorageMemory = require('localstorage-memory');
  _localStorage = localStorageMemory;
}

export async function signup(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'POST',
    data: params,
  }).then((user) => _localStorage.setItem('userid', user.id));
}

export async function login(params) {
  return await request(`${config.ghServiceUrl}/api/oauth/token`, {
    method: 'POST',
    data: { ...params, grant_type: 'password' },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic Z2hmcm9udDpzZWNyZXQ=',
    },
  }).then((user) => _localStorage.setItem('access_token', user.access_token));
}

export async function logout(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'POST',
    data: params,
  }).then((user) => _localStorage.removeItem('userid', user.id));
}

export async function getUser(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'GET',
    data: params,
  });
}

export async function getQuestions(params) {
  return request(`${config.ghServiceUrl}/api/questions`, {
    method: 'GET',
    params,
  });
}

export async function createQuestion(params) {
  return request(`${config.ghServiceUrl}/api/questions`, {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${_localStorage.getItem('access_token')}`,
    },
  });
}

export async function getInterviews(params) {
  return request(`${config.ghServiceUrl}/api/interviews`, {
    method: 'GET',
    params,
  });
}

export async function getInterview({ id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'GET',
  });
}

export function getCurrentUserUrl() {
  return {
    authUrl: `${config.ghServiceUrl}/api/users/me`,
    reqOptions: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${_localStorage.getItem('access_token')}`,
      },
    },
  };
}
