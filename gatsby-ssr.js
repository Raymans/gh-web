/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import { StoreProvider } from './src/context/ContextProvider';
import { navigate } from 'gatsby';
import { Auth0Provider } from '@auth0/auth0-react';

const React = require('react');

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_CLIENTID}
    audience={process.env.AUTH0_AUDIENCE}
    redirectUri={process.env.AUTH0_CALLBACK}
    onRedirectCallback={(state) => navigate(state)}
    responseType="token id_token"
    scope="openid profile email"
    // state= redirectUrl
    useRefreshTokens="true"
    cacheLocation="localstorage"
  >
    <StoreProvider>{element}</StoreProvider>
  </Auth0Provider>
)
