import React from 'react';
import { navigate } from 'gatsby';
import { handleAuthentication } from '../utils/auth';


export default () => {
  handleAuthentication((state) => navigate(state));

  return (
    <div>
      Logging you in...
    </div>
  );
};
