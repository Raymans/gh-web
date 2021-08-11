import React, { useState } from 'react';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import Seo from '../Seo';
import InterviewSessionResult from '../Interviews/InterviewSessionResult';

const TestedInterview = ({ sessionId }) => {
  const {
    user
  } = useAuth0();

  const [interviewSession, setInterviewSession] = useState({
    interview: {},
    candidateUser: {}
  });
  const isOwner = user?.sub === interviewSession.interview.clientUser?.id;

  const onLoadedInterviewSession = (is) => setInterviewSession(is);
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="Passed Assessments"/>,
        path: '/testedInterviews'
      }, {
        label: interviewSession.interview.title,
        path: location.pathname
      }]}
      />
      <Headline title={interviewSession.interview.title}>
        {
          isOwner
          && (
            <Link
              to={`/profile/${interviewSession.candidateUser.id}`}
            >
              {interviewSession.candidateUser.name}
            </Link>
          )
        }
      </Headline>
      <InterviewSessionResult onLoaded={onLoadedInterviewSession} sessionId={sessionId}
                              isOwner={isOwner}/>
      <Seo subTitle={interviewSession.interview.title}/>
    </>
  );
};

export default TestedInterview;
