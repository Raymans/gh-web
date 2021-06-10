import React from 'react';
import { Button, Result } from 'antd';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import Article from '../components/Article';
import { FrownOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
  const intl = useIntl();
  return (
    <Article>
      <Result
        status="error"
        icon={<FrownOutlined/>}
        title={intl.formatMessage({ defaultMessage: 'Page not found.' })}
        subTitle={intl.formatMessage({ defaultMessage: 'We can\'t find that page. This could be because: The page doesn\'t exist. or you don\'t have view permission.' })}
        extra={[
          <Button type="primary" key="backtohome" onClick={() => navigate('/')}>
            <FormattedMessage defaultMessage="Back to Home Page"/>
          </Button>
        ]}
      />
    </Article>
  );
};

export default NotFoundPage;
