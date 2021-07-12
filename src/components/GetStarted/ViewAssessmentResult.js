import React from 'react';
import InterviewResult from '../ManageInterviews/InterviewResult';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { Alert, Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const ViewAssessmentResult = ({
  id,
  sid
}) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Alert
        message="Get started - Create Assessment"
        description={
          <ul>
            <ui>
              Learn how to create your own assessments
            </ui>
            <ui>
              Learn how to create your own assessments1
            </ui>
          </ul>
        }
        type="info"
        showIcon
      />
      <InterviewResult id={id} sessionId={sid}/>
      <h2>
        <FormattedMessage defaultMessage={'Thanks for walking through our Get Start process! '}/>
        <br/>
        <FormattedMessage
          defaultMessage={'NOW, Let\'s sign up for assessing real assessments and manage your own assessments!'}/>
      </h2>
      <Button type="primary" key="enableOrg"
              onClick={() => loginWithRedirect(location.pathname)}>
        <FormattedMessage defaultMessage="Login here"/>
      </Button>

    </>
  );
};

export default ViewAssessmentResult;
