import { deploy, dump } from 'auth0-deploy-cli';
import auth0_prd from './auth0-prd.json';
import auth0_dev from './auth0-dev.json';

dump({
  output_folder: './local',
  format: 'yaml',
  config: {
    AUTH0_DOMAIN: auth0_prd.domain,
    AUTH0_CLIENT_ID: auth0_prd.client_id,
    AUTH0_CLIENT_SECRET: auth0_prd.client_secret
  }
})
  .then(() => {
    console.log('Auth0 configuration export successful');

    return deploy({
      input_file: './local/tenant.yaml',
      config: {
        AUTH0_DOMAIN: auth0_dev.domain,
        AUTH0_CLIENT_ID: auth0_dev.client_id,
        AUTH0_CLIENT_SECRET: auth0_dev.client_secret
      }
    });
  })
  .then((v) => {
    console.log('Auth0 configuration applied to tenant successful', v);
  })
  .catch((err) => {
    console.log('Error during Auth0 configuration export/applying', err);
  });
