import { useAuth0 } from '@auth0/auth0-react';
import request1 from '../utils/request';
import config from '../../content/meta/config';

export default () => {
  const { getAccessTokenSilently } = useAuth0();
  const request = request1(getAccessTokenSilently);

  return {
    getUser: (params) => request(`${config.ghServiceUrl}/api/users`, {
      method: 'GET',
      data: params,
    }),
    getQuestions: ({ url = `${config.ghServiceUrl}/api/questions`, ...params } = {}) => request(`${url}`, {
      method: 'GET',
      params,
    }).then((res) => (!res ? {} : res)),

    getQuestion: ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
      method: 'GET',
    }),

    createQuestion: ({ params }) => request(`${config.ghServiceUrl}/api/questions`, {
      method: 'POST',
      data: params,
    }),

    updateQuestion: ({ id, params }) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
      method: 'POST',
      data: params,
    }),

    deleteQuestion: (id) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
      method: 'DELETE',
    }),

    likeQuestion: ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}/like`, {
      method: 'POST',
    }),

    unlikeQuestion: ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}/unlike`, {
      method: 'POST',
    }),

    createInterview: (params) => request(`${config.ghServiceUrl}/api/interviews`, {
      method: 'POST',
      data: params,
    }),

    updateInterview: ({ params, id }) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
      method: 'POST',
      data: params,
    }),

    publishInterview: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/publish`, {
      method: 'POST',
    }),

    getInterviews: ({ url = `${config.ghServiceUrl}/api/interviews`, ...params }) => request(url, {
      method: 'GET',
      params,
    }).then((res) => (!res ? {} : res)),

    getInterview: (id) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
      method: 'GET',
    }),

    getPublishedInterview: (id) => request(`${config.ghServiceUrl}/api/publishedInterviews/${id}`, {
      method: 'GET',
    }),

    deleteInterview: (id) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
      method: 'DELETE',
    }),

    likeInterview: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/like`, {
      method: 'POST',
    }),

    unlikeInterview: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/unlike`, {
      method: 'POST',
    }),

    createInterviewSession: ({
      id: interviewId, email: userEmail, name, interviewMode = 'REAL', duration = -1,
    }) => request(`${config.ghServiceUrl}/api/interviewSessions`, {
      method: 'POST',
      data: {
        interviewId, userEmail, name, interviewMode, duration,
      },
    }),

    startInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/start`, {
      method: 'POST',
    }),

    submitInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/submit`, {
      method: 'POST',
    }),

    calculateInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/calculateScore`, {
      method: 'POST',
    }),

    getAverageScore: (interviewSessionId) => request(`${config.ghServiceUrl}/api/interviewSessions/${interviewSessionId}/averageScore`, {
      method: 'GET',
    }),

    sendInterviewSessionToCandidate: ({ id }) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/send`, {
      method: 'POST',
    }),

    addAnswerToInterviewSession: ({
      id, sectionId, questionId, answerId = [],
    }) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/answers`, {
      method: 'POST',
      data: { sectionId, questionSnapshotId: questionId, answerId },
    }),

    getCurrentInterviewSession: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/interviewSession`, {
      method: 'GET',
    }),

    getInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}`, {
      method: 'GET',
    }),

    getInterviewSessions: ({ interviewId = '', owner = true } = {}) => request(`${config.ghServiceUrl}/api/interviewSessions`, {
      method: 'GET',
      params: { interviewId, owner },
    }),

    getSpecializations: (params) => request(`${config.ghServiceUrl}/api/specializations`, {
      method: 'GET',
      params,
    }),

    getUserProfile: (userId = '') => request(`${config.ghServiceUrl}/api/users/${decodeURIComponent(userId)}`, {
      method: 'GET',
    }),

    updateUserProfile: ({
      email, name, nickname, companyName, linkedIn, github, note,
    }) => request(`${config.ghServiceUrl}/api/users/me`, {
      method: 'POST',
      data: {
        email, name, nickname, companyName, linkedIn, github, note,
      },
    }),
  };
};
