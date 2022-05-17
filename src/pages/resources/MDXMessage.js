import React from 'react';
import { FormattedMessage } from 'gatsby-plugin-intl';

const MDXMessage = (props) => {
  return (
    <>
      <FormattedMessage id="page.about.us.title" />
      <FormattedMessage
        id="page.about.us.desc"
        values={{ br: <br/> }}
      />
    </>
  );
};
