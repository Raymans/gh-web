import { useAuth0 } from '@auth0/auth0-react';
import request1 from '../utils/request';
import config, { guest } from '../../content/meta/config';
import useGetStarted from './useGetStarted';
import axios from 'axios';
import qs from 'qs';

export const getGuestUserToken = () => axios(`${config.ghServiceUrl}/api/tokens`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: qs.stringify({
    username: guest.email,
    password: guest.password
  })
})
  .then(({ data }) => data)
  .catch(() => console.error('Cannot get Guest Token'));
export default () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    isGetStarted,
    gsTokens,
    clearGSTokens
  } = useGetStarted();
  const request = request1(getAccessTokenSilently, isGetStarted && gsTokens, clearGSTokens);

  return {
    getUser: (params) => request(`${config.ghServiceUrl}/api/users`, {
      method: 'GET',
      data: params
    }),
    getGuestUserToken,
    getQuestions: ({
      url = `${config.ghServiceUrl}/api/questions`,
      ...params
    } = {}) => request(`${url}`, {
      method: 'GET',
      params
    })
      .then((res) => (!res ? {} : res)),

    getQuestion: ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
      method: 'GET'
    }),

    createQuestion: ({ params }) => request(`${config.ghServiceUrl}/api/questions`, {
      method: 'POST',
      data: params
    }),

    updateQuestion: ({
      id,
      params
    }) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
      method: 'POST',
      data: params
    }),

    deleteQuestion: (id) => request(`${config.ghServiceUrl}/api/questions/${id}`, {
      method: 'DELETE'
    }),

    likeQuestion: ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}/like`, {
      method: 'POST'
    }),

    unlikeQuestion: ({ id }) => request(`${config.ghServiceUrl}/api/questions/${id}/unlike`, {
      method: 'POST'
    }),

    createInterview: (params) => request(`${config.ghServiceUrl}/api/interviews`, {
      method: 'POST',
      data: params
    }),

    updateInterview: ({
      params,
      id
    }) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
      method: 'POST',
      data: params
    }),

    copyInterview: ({
      params,
      id
    }) => request(`${config.ghServiceUrl}/api/interviews/${id}/copy`, {
      method: 'POST',
      data: params
    }),

    getInterviews: ({
      url = `${config.ghServiceUrl}/api/interviews`,
      ...params
    }) => request(url, {
      method: 'GET',
      params
    })
      .then((res) => (!res ? {} : res)),

    getInterviewsByUser: ({
      userId,
      url = `${config.ghServiceUrl}/api/users/${userId}/ownedInterviews`,
      ...params
    }) => request(url, {
      method: 'GET',
      params
    })
      .then((res) => (!res ? {} : res)),

    getInterviewsByUserLiked: ({
      userId,
      url = `${config.ghServiceUrl}/api/users/${userId}/likedInterviews`,
      keyword
    }) => request(url, {
      method: 'GET',
      params: { keyword: keyword || null }
    })
      .then((res) => (!res ? {} : res)),

    getInterview: (id) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
      method: 'GET'
    }),

    deleteInterview: (id) => request(`${config.ghServiceUrl}/api/interviews/${id}`, {
      method: 'DELETE'
    }),

    likeInterview: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/like`, {
      method: 'POST'
    }),

    unlikeInterview: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/unlike`, {
      method: 'POST'
    }),

    createInterviewSession: ({
      id: interviewId,
      email: userEmail,
      name,
      interviewMode = 'REAL',
      duration = -1
    }) => request(`${config.ghServiceUrl}/api/interviewSessions`, {
      method: 'POST',
      data: {
        interviewId,
        userEmail,
        name,
        interviewMode,
        duration
      }
    }),

    startInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/start`, {
      method: 'POST'
    }),

    submitInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/submit`, {
      method: 'POST'
    }),

    calculateInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/calculateScore`, {
      method: 'POST'
    }),

    getAverageScore: (interviewSessionId) => request(`${config.ghServiceUrl}/api/interviewSessions/${interviewSessionId}/averageScore`, {
      method: 'GET'
    }),

    sendInterviewSessionToCandidate: ({ id }) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/send`, {
      method: 'POST'
    }),

    addAnswerToInterviewSession: ({
      id,
      sectionId,
      questionSnapshotId,
      answerId = null,
      answer = null
    }) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/answers`, {
      method: 'POST',
      data: {
        sectionId,
        questionSnapshotId,
        answerId,
        answer
      }
    }),

    markQuestionToInterviewSession: ({
      id,
      sectionId,
      questionSnapshotId,
      correct
    }) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}/markQuestion`, {
      method: 'POST',
      data: {
        sectionId,
        questionSnapshotId,
        correct
      }
    }),

    getCurrentInterviewSession: ({ id }) => request(`${config.ghServiceUrl}/api/interviews/${id}/interviewSession`, {
      method: 'GET'
    }),

    getInterviewSession: (id) => request(`${config.ghServiceUrl}/api/interviewSessions/${id}`, {
      method: 'GET'
    }),

    getInterviewSessions: ({
      interviewId = '',
      owner = true,
      sort = 'totalScore'
    } = {}) => request(`${config.ghServiceUrl}/api/interviewSessions`, {
      method: 'GET',
      params: {
        interviewId,
        owner,
        sort
      }
    }),

    getSpecializations: (params) => request(`${config.ghServiceUrl}/api/specializations`, {
      method: 'GET',
      params
    }),

    getUserProfile: (userId = '') => request(`${config.ghServiceUrl}/api/users/${decodeURIComponent(userId)}`, {
      method: 'GET'
    }),

    getMyProfile: () => request(`${config.ghServiceUrl}/api/users/me`, {
      method: 'GET'
    }),
    updateUserProfile: ({
      email,
      name,
      nickname,
      companyName,
      linkedIn,
      github,
      note,
      locale
    }) => request(`${config.ghServiceUrl}/api/users/me`, {
      method: 'POST',
      data: {
        email,
        name,
        nickname,
        companyName,
        linkedIn,
        github,
        note,
        locale
      }
    }),
    updateUserAvatar: ({ file }) => {
      const formData = new FormData();
      formData.append('file', file);
      return request(`${config.ghServiceUrl}/api/users/me/avatar`, {
        method: 'POST',
        data: formData
      });
    },

    updatePassword: ({
      oldPassword,
      newPassword
    }) => {
      return request(`${config.ghServiceUrl}/api/users/me/password`, {
        method: 'POST',
        data: {
          oldPassword,
          newPassword
        }
      });
    },

    enableOrganization: ({ organizationName }) => request(`${config.ghServiceUrl}/api/organizations/me/enable`, {
      method: 'POST',
      data: { organizationName }
    }),
    updateOrganization: ({
      id,
      name
    }) => request(`${config.ghServiceUrl}/api/organizations/${id}`, {
      method: 'POST',
      data: { name }
    }),
    updateOrganizationImage: ({
      id,
      file
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      return request(`${config.ghServiceUrl}/api/organizations/${id}/avatar`, {
        method: 'POST',
        data: formData
      });
    },
    joinOrganization: ({ organizationId }) => request(`${config.ghServiceUrl}/api/organizations/${organizationId}/join`, {
      method: 'POST'
    }),

    declineOrganization: ({ organizationId }) => request(`${config.ghServiceUrl}/api/organizations/${organizationId}/decline`, {
      method: 'POST'
    }),

    leaveOrganization: () => request(`${config.ghServiceUrl}/api/organizations/me/leave`, {
      method: 'DELETE'
    }),
    removeUserFromOrganization: ({
      userId,
      organizationId
    }) => request(`${config.ghServiceUrl}/api/organizations/${organizationId}/users/${userId}`, {
      method: 'DELETE'
    }),
    getOrganization: ({ organizationId = '' }) => request(`${config.ghServiceUrl}/api/organizations/${organizationId}`, {
      method: 'GET'
    }),
    getMyOrganization: () => request(`${config.ghServiceUrl}/api/organizations/me`, {
      method: 'GET'
    }),
    inviteUserToOrganization: ({
      email,
      organizationId
    }) => request(`${config.ghServiceUrl}/api/organizations/${decodeURIComponent(organizationId)}/invitations`, {
      method: 'POST',
      data: { email }
    }),
    unInviteUserFromOrganization: ({
      email,
      organizationId
    }) => request(`${config.ghServiceUrl}/api/organizations/${decodeURIComponent(organizationId)}/invitations`, {
      method: 'DELETE',
      data: { email }
    }),


    changeOrganizationOwner: ({
      clientUserId
    }) => request(`${config.ghServiceUrl}/api/organizations/me/owner`, {
      method: 'POST',
      data: { clientUserId }
    }),
    createDepartment: ({ departmentName }) => request(`${config.ghServiceUrl}/api/departments`, {
      method: 'POST',
      data: { departmentName }
    }),
    getDepartment: ({ departmentId }) => request(`${config.ghServiceUrl}/api/departments/${departmentId}`, {
      method: 'GET'
    }),
    getDepartments: () => request(`${config.ghServiceUrl}/api/departments`, {
      method: 'GET'
    }),
    updateDepartment: ({
      departmentId,
      departmentName
    }) => request(`${config.ghServiceUrl}/api/departments/${departmentId}`, {
      method: 'POST',
      data: { departmentName }
    }),
    deleteDepartment: ({ departmentId }) => request(`${config.ghServiceUrl}/api/departments/${departmentId}`, {
      method: 'DELETE'
    }),
    assignUserToDepartment: ({
      userId,
      departmentId
    }) => request(`${config.ghServiceUrl}/api/users/${userId}/department`, {
      method: 'POST',
      data: { departmentId }
    })
  };
};
