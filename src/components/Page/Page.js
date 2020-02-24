import React from 'react';
import PropTypes from 'prop-types';

import Headline from '../Article/Headline';
import Bodytext from '../Article/Bodytext';

const Page = (props) => {
  const {
    page: {
      html,
      frontmatter: { title },
    },
  } = props;

  return (
    <>
      <header>
        <Headline title={title} />
      </header>
      <Bodytext html={html} />
    </>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
};

export default Page;
