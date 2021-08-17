import { useAuth0 } from '@auth0/auth0-react';
import { useIntl } from 'gatsby-plugin-intl';

export default () => {
  const {
    loginWithRedirect,
    logout
  } = useAuth0();
  const { locale } = useIntl();

  const logoutWithRedirect = () => logout({
    returnTo: locale === 'zh-tw' ? `${window.location.origin}` : `${window.location.origin}/${locale}`
  });

  const handleLogin = async (pathname) => {
    // TODO redirect to pathname.
    await loginWithRedirect({
      redirectUri: locale === 'zh-tw' ? `${window.location.origin}` : `${window.location.origin}/${locale}`,
      appState: {
        targetUrl: '/'
      },
      ui_locales: locale === 'zh-tw' ? 'zh-TW' : locale
    });
  };
  return {
    logoutWithRedirect,
    handleLogin
  };
}
