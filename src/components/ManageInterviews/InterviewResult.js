import React, { useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import Seo from '../Seo';
import InterviewSessionResult from '../Interviews/InterviewSessionResult';
import DateTime from '../General/DateTime';
import styled from 'styled-components';

const StyledDateTime = styled(DateTime)`
  font-size: 0.4em;
  margin-left: 10px;
`;
const InterviewResult = ({ sessionId }) => {
  const {
    user
  } = useAuth0();
  const intl = useIntl();
  const [interviewSession, setInterviewSession] = useState({
    interview: {},
    candidateUser: {}
  });
  const isOwner = user?.sub === interviewSession.interview.clientUser?.id;

  const onLoadedInterviewSession = (is) => setInterviewSession(is);
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="List Assessments"/>,
        path: '/interviews'
      }, {
        label: interviewSession.interview.title,
        path: location.pathname
      }]}
      />
      <Headline title={interviewSession.interview.title}>
        {
          isOwner
          && (
            <>
              <span style={{ fontSize: '0.4em' }}><FormattedMessage
                defaultMessage="Tester:"/></span>
              <Link
                to={`/profile/${interviewSession.candidateUser.id}`}
              >
                {interviewSession.candidateUser.name}
              </Link>
              <StyledDateTime date={interviewSession.interviewEndDate}/>
            </>
          )
        }
      </Headline>
      <InterviewSessionResult onLoaded={onLoadedInterviewSession} sessionId={sessionId}
                              isOwner={isOwner}/>
      <Seo subTitle={interviewSession.interview.title}/>
    </>
  );
};

export default InterviewResult;
