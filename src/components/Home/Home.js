/* eslint no-unused-vars: 0 */

import React from 'react';

import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faGithubSquare,
  faJava,
  faJs,
  faStripe,
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 0 50px;
  h1 {
    font-weight: 500;
    margin: 50px auto 7px;
    padding-bottom: 10px;
    p {
      text-align: center;
      font-size: 26px;
    }
  }
  h2 {
  text-align: center;
    border: 0;
    font-size: 18px;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
  &.no-pic p{
    text-align: center;
  }

  .ant-col-6, .ant-col-12{
    text-align: center;
  }
`;
const StyledRow = styled(Row)`
  margin: 50px 60px;
`;

const ImageSection = styled.section`
  height: 250px;
  background-image: url('https://dvokhk8ohqhd8.cloudfront.net/assets/landing/how-it-works/why-triplebyte-technical-skills-04301dc3de284da4beedc59823678befc78b07e4dd83fc302be64f3999dc748c.svg');
  background-size: cover;
`;

const Home = (props) => {
  const { backgrounds } = props;
  return (
    <>
      <Section className="no-pic">
        <h1><p>Practice Interviews</p></h1>
        <p>Explore and exam REAL Interviews!!</p>
        <p>Hiring company will be noticed when you submit your result!!</p>
        <p>
          Want to apply a job right now?! Do it
          <Link to="/interviews"> HERE! </Link>
        </p>
        <p>__List Specializations and roles here.__</p>
        <h2>Looking for a specialization?</h2>
        <StyledRow type="flex" justify="space-around">
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=Front End Engineer">
              <FontAwesomeIcon icon={faJs} size="7x" />
              <p style={{ paddingTop: '10px' }}>Front-End Engineer</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=java">
              <FontAwesomeIcon icon={faJava} size="7x" />
              <p style={{ paddingTop: '10px' }}>Java Engineer</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=fullstack">
              <FontAwesomeIcon icon={faTerminal} size="7x" />
              <p style={{ paddingTop: '10px' }}>Full Stack Engineer</p>
            </Link>
          </Col>
        </StyledRow>

        <h2>Looking for a Company who is hiring?</h2>
        <StyledRow type="flex" justify="space-around">
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=frontend">
              <FontAwesomeIcon icon={faFacebookSquare} size="7x" />
              <p style={{ paddingTop: '10px' }}>Facebook</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=java">
              <FontAwesomeIcon icon={faGithubSquare} size="7x" />
              <p style={{ paddingTop: '10px' }}>Github</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=fullstack">
              <FontAwesomeIcon icon={faStripe} size="7x" />
              <p style={{ paddingTop: '10px' }}>Stripe</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=frontend">
              <FontAwesomeIcon icon={faFacebookSquare} size="7x" />
              <p style={{ paddingTop: '10px' }}>Facebook</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=java">
              <FontAwesomeIcon icon={faGithubSquare} size="7x" />
              <p style={{ paddingTop: '10px' }}>Github</p>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link to="interviews?sp=fullstack">
              <FontAwesomeIcon icon={faStripe} size="7x" />
              <p style={{ paddingTop: '10px' }}>Stripe</p>
            </Link>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={12}>
            <h1><p>Create your interviews</p></h1>
            <p>Want to have your own interviews to let everyone see and test it? you can do that easily to build up your own questions for later use or share it</p>
            <p>Keep your interview privately so you can share and decide who can see/test your interview</p>
          </Col>
          <Col span={12}>
            <ImageSection backgrounds={backgrounds} />
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={12}>
            <ImageSection backgrounds={backgrounds} />
          </Col>
          <Col span={12}>
            <h1><p>Review candidate's results.</p></h1>
            <p>You can easily see who tests your interview and review summary of each result in a very clear view.</p>
          </Col>
        </StyledRow>
      </Section>
      <Section className="no-pic">
        <h1><p>Top engineering roles come to you</p></h1>
        <p>450+ top tech companies hire for their best engineering teams from GeekHub. Teams reach out to you so you will never miss those hot opportunities!</p>
        <StyledRow type="flex" justify="space-around">
          <div style={{ maxWidth: '1000px' }}>
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
              alt="adobe logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
              alt="robinhood logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
              alt="adobe logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
              alt="robinhood logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
              alt="adobe logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
              alt="robinhood logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
              alt="adobe logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
              alt="robinhood logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
              alt="adobe logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
              alt="robinhood logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
              alt="adobe logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/adobe-301888a5fa8af639f440f58c91bbc034083406d44a9ef03b4cc54f08d43a1310.svg"
            />
            <img
              className=" lazyloaded"
              data-src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
              alt="robinhood logo"
              src="https://dvokhk8ohqhd8.cloudfront.net/assets/company_logos/robinhood-07aec12173646d32c5f77431d8760a46b274453ade1c73dd7a1d1f080a97afe8.svg"
            />
          </div>
        </StyledRow>
      </Section>
    </>
  );
};

Home.propTypes = {
  backgrounds: PropTypes.object,
};

export default Home;
