import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';


const AboutUs = () => {
  return <div><h2><FormattedMessage id="home.about.us.title" defaultMessage="About Us"/>
  </h2>
    <p><FormattedMessage
      id="home.about.us.desc"
      defaultMessage="Click on Get Started to experience the entire online assessment lifecycle without needing to create an account."/>
    </p></div>;
};

export default AboutUs;
