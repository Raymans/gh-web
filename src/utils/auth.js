import auth0js from 'auth0-js';

export const isBrowser = typeof window !== 'undefined';

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false
};

// Only instantiate Auth0 if we’re in the browser.
const auth0 = isBrowser
  ? new auth0js.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    redirectUri: process.env.AUTH0_CALLBACK,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email'
  })
  : {};

export const login = (redirectUrl = '/') => {
  if (!isBrowser) {
    return;
  }
  auth0.authorize({ state: redirectUrl });
};

export const logout = () => {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('profile');
  localStorage.removeItem('accessToken');

  const {
    protocol,
    host
  } = window.location;
  const returnTo = `${protocol}//${host}`;

  auth0.logout({ returnTo });
};

const setSession = (callback) => (err, authResult) => {
  if (!isBrowser) {
    return;
  }

  if (err) {
    console.error(err);
    callback();
    return;
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.accessToken = authResult.accessToken;
    tokens.idToken = authResult.idToken;
    tokens.expiresAt = expiresAt;
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
    localStorage.setItem('accessToken', authResult.accessToken);
    callback(authResult.state);
  }
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return false;
  }

  return localStorage.getItem('isLoggedIn') === 'true';
};

export const silentAuth = (callback) => {
  if (!isBrowser) {
    return;
  }

  if (!isAuthenticated()) callback();
  auth0.checkSession({}, setSession(callback));
};

export const handleAuthentication = (callback = () => {
}) => {
  if (!isBrowser) {
    return;
  }

  auth0.parseHash(setSession(callback));
};

export const getAccessToken = () => {
  if (!isBrowser) {
    return '';
  }

  return localStorage.getItem('accessToken');
};

export const getUserInfo = () => {
  if (!isBrowser) {
    return {};
  }
  let profile = localStorage.getItem('profile');
  profile = profile ? JSON.parse(profile) : {};
  return profile;
};
