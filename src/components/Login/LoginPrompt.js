import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useLocation } from '@reach/router';
import { useAuth0 } from '@auth0/auth0-react';


const LoginPrompt = ({
  children,
  title
}) => {
  const {
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();
  const location = useLocation();
  const [isLoginPrompt, setIsLoginPrompt] = useState(false);
  const handleLoginPrompt = () => {
    if (!isAuthenticated) {
      setIsLoginPrompt(true);
    }
  };
  return (
    <>
      <Modal
        title={title || 'Login to continue'}
        visible={isLoginPrompt}
        onCancel={() => setIsLoginPrompt(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => loginWithRedirect(location.pathname)}>
            Login
          </Button>
        ]}
      >
        <p>You have to Login to continue!</p>
      </Modal>
      <span onClick={handleLoginPrompt}>
        {children(isAuthenticated)}
      </span>
    </>
  );
};
export default LoginPrompt;
