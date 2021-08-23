import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuth from '../../hooks/useAuth';

const LoginNeededWrapper = ({
  title,
  subTitle,
  isLoginNeeded,
  children
}) => {
  const {
    isLoading,
    isAuthenticated
  } = useAuth0();
  const { handleLogin } = useAuth();
  if (!isLoginNeeded) {
    return children;
  }
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
                  onClick={() => handleLogin(location.pathname)}>
            <FormattedMessage defaultMessage="Login here"/>
          </Button>
        ]}
      />
      }
    </>
  );
};

export default LoginNeededWrapper;

LoginNeededWrapper.propTypes = {
  children: PropTypes.node,
  isLoginNeeded: PropTypes.bool,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

LoginNeededWrapper.defaultProps = {
  isLoginNeeded: true
};
