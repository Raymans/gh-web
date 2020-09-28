import qs from 'qs';
import request from '../utils/request';
import config from '../../content/meta/config';


const getStartInterviewSessionUrl = ({ id }) => `${config.ghServiceUrl}/api/interviewSessions/${id}/start`;

const getSpecializations = (params) => request(`${config.ghServiceUrl}/api/specializations`, {
  method: 'GET',
  params,
});

const getInterviews = ({ url = `${config.ghServiceUrl}/api/interviews` } = {}) => request(url, {
  method: 'GET',
});

const getUser = (params) => request(`${config.ghServiceUrl}/api/users`, {
  method: 'GET',
  data: params,
});

const getQuestions = ({ url = `${config.ghServiceUrl}/api/questions`, ...params } = {}) => request(`${url}`, {
  method: 'GET',
  params,
});

const getQuestion = ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
  method: 'GET',
});

const createQuestion = () => request(`${config.ghServiceUrl}/api/questions`, {
  method: 'POST',
});

const updateQuestion = ({ id } = {}) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
  method: 'POST',
});

const deleteQuestion = (id) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
  method: 'DELETE',
});

const likeQuestion = ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}/like`, {
  method: 'POST',
});

const unlikeQuestion = ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}/unlike`, {
  method: 'POST',
});

const createInterview = () => request(`${config.ghServiceUrl}/api/interviews`, {
  method: 'POST',
});

const updateInterview = ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
  method: 'POST',
});

const publishInterview = ({ id } = {}) => request(`${config.ghServiceUrl}/api/interviews/${id}/publish`, {
  method: 'POST',
});

const getInterview = (id) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
  method: 'GET',
});

const getPublishedInterview = (id) => request(`${config.ghServiceUrl}/api/publishedInterviews/${id}`, {
  method: 'GET',
});

const deleteInterview = (id) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
  method: 'DELETE',
});

const likeInterview = ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/like`, {
  method: 'POST',
});

const unlikeInterview = ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/unlike`, {
  method: 'POST',
});

const createInterviewSession = ({
  id: interviewId, email: userEmail, name, interviewMode = 'REAL', duration = -1,
} = {}) => request(`${config.ghServiceUrl}/api/interviewSessions`, {
  method: 'POST',
  data: {
    interviewId, userEmail, name, interviewMode, duration,
  },
});

const startInterviewSession = ({ id }) => request(getStartInterviewSessionUrl({ id }), {
  method: 'POST',
});


const submitInterviewSession = (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/submit`, {
  method: 'POST',
});

const calculateInterviewSession = (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/calculateScore`, {
  method: 'POST',
});

const getAverageScore = (interviewSessionId) => request(`${config.ghServiceUrl}/api/interviewSessions/${interviewSessionId}/averageScore`, {
  method: 'GET',
});

const sendInterviewSessionToCandidate = ({ id }) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/send`, {
  method: 'POST',
});

const addAnswerToInterviewSession = ({
  id,
} = {}) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/answers`, {
  method: 'POST',
});

const getCurrentInterviewSession = ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/interviewSession`, {
  method: 'GET',
});

const getInterviewSession = (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}`, {
  method: 'GET',
});

const getInterviewSessions = ({ interviewId = '', owner = true } = {}) => request(`${config.ghServiceUrl}/api/interviewSessions?${qs.stringify({ interviewId, owner })}`, {
  method: 'GET',
  data: { interviewId, owner },
});

const getUserProfile = (userId = '') => request(`${config.ghServiceUrl}/api/users/${decodeURIComponent(userId)}`, {
  method: 'GET',
});

const updateUserProfile = ({
  email, name, nickname, companyName, linkedIn, github, note,
} = {}) => request(`${config.ghServiceUrl}/api/users/me`, {
  method: 'POST',
  data: {
    email, name, nickname, companyName, linkedIn, github, note,
  },
});

export default () => ({
  getSpecializations,
  getInterviews,
  getQuestions,
  getUser,
  getUserProfile,
  updateUserProfile,
  getInterviewSession,
  getInterviewSessions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  likeQuestion,
  unlikeQuestion,
  createInterview,
  updateInterview,
  publishInterview,
  getInterview,
  getPublishedInterview,
  deleteInterview,
  likeInterview,
  unlikeInterview,
  createInterviewSession,
  startInterviewSession,
  submitInterviewSession,
  calculateInterviewSession,
  getAverageScore,
  sendInterviewSessionToCandidate,
  addAnswerToInterviewSession,
  getCurrentInterviewSession,
  getStartInterviewSessionUrl,
});
