import React from 'react';

import Article from '../components/Article';
import Headline from '../components/Article/Headline';

const ProfilePage = () => (
  <>
    <Article>
      <header>
        <Headline title="Profile" />
      </header>
    </Article>
  </>
);

ProfilePage.propTypes = {
};

export default ProfilePage;
