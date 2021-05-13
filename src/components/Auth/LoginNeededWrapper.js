import { Button, Result } from 'antd';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginNeededWrapper = ({
  title,
  subTitle,
  children
}) => {
  const {
    loginWithRedirect,
    isLoading,
    isAuthenticated
  } = useAuth0();
  return (
    <>
      {!isLoading && isAuthenticated && children}
      {!isLoading && !isAuthenticated &&
      <Result
        status="info"
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" key="enableOrg"
                  onClick={() => loginWithRedirect(location.pathname)}>
            <FormattedMessage defaultMessage="Login here"/>
          </Button>
        ]}
      />
      }
    </>
  );
};

export default LoginNeededWrapper;
