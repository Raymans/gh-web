import React from 'react';
import PropTypes from 'prop-types';

import Headline from '../Article/Headline';
import Bodytext from '../Article/Bodytext';

const Page = (props) => {
  const {
    page: {
      body,
      frontmatter: { title },
    },
  } = props;

  return (
    <>
      <header>
        <Headline title={title} />
      </header>
      <Bodytext body={body} />
    </>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
};

export default Page;
