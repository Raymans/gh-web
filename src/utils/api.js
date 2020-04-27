import qs from 'qs';
import config from '../../content/meta/config';
import request from './request';

// eslint-disable-next-line no-underscore-dangle
let _localStorage;
if (typeof window !== 'undefined' && window) {
  _localStorage = localStorage;
} else {
  const localStorageMemory = require('localstorage-memory');
  _localStorage = localStorageMemory;
}

const authHeader = {
  Authorization: `Bearer ${_localStorage.getItem('accessToken')}`,
};

export async function signup(params) {
  return request(`${config.ghServiceUrl}/api/users`, {
    method: 'POST',
    data: params,
  }).then((user) => _localStorage.setItem('userid', user.id));
}

export async function login(params) {
  return request(`${config.ghServiceUrl}/api/oauth/token`, {
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

export async function getQuestions({ url = `${config.ghServiceUrl}/api/questions`, ...params }) {
  return request(`${url}`, {
    method: 'GET',
    params,
    headers: {
      ...authHeader,
    },
  }).then((res) => (!res ? {} : res));
}

export async function getQuestion({ id }) {
  return request(`${config.ghServiceUrl}/api/questions/${id}`, {
    method: 'GET',
    headers: {
      ...authHeader,
    },
  });
}

export async function createQuestion({ params }) {
  return request(`${config.ghServiceUrl}/api/questions`, {
    method: 'POST',
    data: params,
    headers: {
      ...authHeader,
    },
  });
}

export async function updateQuestion({ id, params }) {
  return request(`${config.ghServiceUrl}/api/questions/${id}`, {
    method: 'POST',
    data: params,
    headers: {
      ...authHeader,
    },
  });
}

export async function deleteQuestion(id) {
  return request(`${config.ghServiceUrl}/api/questions/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeader,
    },
  });
}

export async function createInterview(params) {
  return request(`${config.ghServiceUrl}/api/interviews`, {
    method: 'POST',
    data: params,
    headers: {
      ...authHeader,
    },
  });
}

export async function updateInterview({ params, id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'POST',
    data: params,
    headers: {
      ...authHeader,
    },
  });
}

export async function publishInterview({ id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}/publish`, {
    method: 'POST',
    headers: {
      ...authHeader,
    },
  });
}

export async function getInterviews({ url = `${config.ghServiceUrl}/api/interviews`, ...params }) {
  return request(url, {
    method: 'GET',
    params,
    headers: {
      ...authHeader,
    },
  }).then((res) => (!res ? {} : res));
}

export async function getInterview(id) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'GET',
    headers: {
      ...authHeader,
    },
  });
}

export async function deleteInterview(id) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeader,
    },
  });
}

export async function createInterviewSession({
  id: interviewId, email: userEmail, name, interviewMode = 'REAL', duration = -1,
}) {
  return request(`${config.ghServiceUrl}/api/interviewSessions`, {
    method: 'POST',
    data: {
      interviewId, userEmail, name, interviewMode, duration,
    },
    headers: {
      ...authHeader,
    },
  });
}

export async function startInterviewSession(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/start`, {
    method: 'POST',
    headers: {
      ...authHeader,
    },
  });
}

export async function submitInterviewSession(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/submit`, {
    method: 'POST',
    headers: {
      ...authHeader,
    },
  });
}

export async function sendInterviewSessionToCandidate(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/send`, {
    method: 'POST',
    headers: {
      ...authHeader,
    },
  });
}

export async function addAnswerToInterviewSession({
  id, sectionId, questionId, answerId = [],
}) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/answers`, {
    method: 'POST',
    data: { sectionId, questionSnapshotId: questionId, answerId },
    headers: {
      ...authHeader,
    },
  });
}

export async function getCurrentInterviewSession({ id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}/interviewSession`, {
    method: 'GET',
    headers: {
      ...authHeader,
    },
  });
}

export async function getInterviewSession(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}`, {
    method: 'GET',
    headers: {
      ...authHeader,
    },
  });
}

export async function getInterviewSessions({ interviewId, owner = true }) {
  return request(`${config.ghServiceUrl}/api/interviewSessions?${qs.stringify({ interviewId, owner })}`, {
    method: 'GET',
    data: { interviewId, owner },
    headers: {
      ...authHeader,
    },
  });
}

export async function getSpecializations(params) {
  return request(`${config.ghServiceUrl}/api/specializations`, {
    method: 'GET',
    params,
    headers: {
      ...authHeader,
    },
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
