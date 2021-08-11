import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useGetStarted from '../../hooks/useGetStarted';

const GetStartedCompleted = () => {
  const { loginWithRedirect } = useAuth0();
  const { clearGSTokens } = useGetStarted();
  const intl = useIntl();
  useEffect(() => {
    return () => clearGSTokens();
  }, []);
  return (<>
    <Result
      status="success"
      title={intl.formatMessage({
          defaultMessage: 'Thanks for walking through our Get Start process!{br} NOW, Let\'s sign up for assessing real assessments and manage your own assessments!'
        }
        , { br: <br/> })}
      extra={<><Link to="/get-started">
        <FormattedMessage defaultMessage={'Try Get Started Again'}/>
      </Link>
        <Button type="primary" key="enableOrg"
                onClick={() => loginWithRedirect(location.pathname)}>
          <FormattedMessage defaultMessage="Login here"/>
        </Button></>}
    />
  </>);
};

export default GetStartedCompleted;
