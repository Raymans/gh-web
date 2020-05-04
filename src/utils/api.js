import qs from 'qs';
import config from '../../content/meta/config';
import request from './request';

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
  }).then((res) => (!res ? {} : res));
}

export async function getQuestion({ id }) {
  return request(`${config.ghServiceUrl}/api/questions/${id}`, {
    method: 'GET',
  });
}

export async function createQuestion({ params }) {
  return request(`${config.ghServiceUrl}/api/questions`, {
    method: 'POST',
    data: params,
  });
}

export async function updateQuestion({ id, params }) {
  return request(`${config.ghServiceUrl}/api/questions/${id}`, {
    method: 'POST',
    data: params,
  });
}

export async function deleteQuestion(id) {
  return request(`${config.ghServiceUrl}/api/questions/${id}`, {
    method: 'DELETE',
  });
}

export async function createInterview(params) {
  return request(`${config.ghServiceUrl}/api/interviews`, {
    method: 'POST',
    data: params,
  });
}

export async function updateInterview({ params, id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'POST',
    data: params,
  });
}

export async function publishInterview({ id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}/publish`, {
    method: 'POST',
  });
}

export async function getInterviews({ url = `${config.ghServiceUrl}/api/interviews`, ...params }) {
  return request(url, {
    method: 'GET',
    params,
  }).then((res) => (!res ? {} : res));
}

export async function getInterview(id) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'GET',
  });
}

export async function getPublishedInterview(id) {
  return request(`${config.ghServiceUrl}/api/publishedInterview/${id}`, {
    method: 'GET',
  });
}

export async function deleteInterview(id) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}`, {
    method: 'DELETE',
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
  });
}

export async function startInterviewSession(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/start`, {
    method: 'POST',
  });
}

export async function submitInterviewSession(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/submit`, {
    method: 'POST',
  });
}

export async function sendInterviewSessionToCandidate(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/send`, {
    method: 'POST',
  });
}

export async function addAnswerToInterviewSession({
  id, sectionId, questionId, answerId = [],
}) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}/answers`, {
    method: 'POST',
    data: { sectionId, questionSnapshotId: questionId, answerId },
  });
}

export async function getCurrentInterviewSession({ id }) {
  return request(`${config.ghServiceUrl}/api/interviews/${id}/interviewSession`, {
    method: 'GET',
  });
}

export async function getInterviewSession(id) {
  return request(`${config.ghServiceUrl}/api/interviewSessions/${id}`, {
    method: 'GET',
  });
}

export async function getInterviewSessions({ interviewId, owner = true }) {
  return request(`${config.ghServiceUrl}/api/interviewSessions?${qs.stringify({ interviewId, owner })}`, {
    method: 'GET',
    data: { interviewId, owner },
  });
}

export async function getSpecializations(params) {
  return request(`${config.ghServiceUrl}/api/specializations`, {
    method: 'GET',
    params,
  });
}
