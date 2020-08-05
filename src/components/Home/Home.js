/* eslint no-unused-vars: 0 */

import React from 'react';

import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5, faJava, faJs, faNode,
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Section = styled.section`
  padding: 0 50px;
  p {text-align: center;}
  h1 {
    font-weight: 500;
    text-align: center;
    max-width: 300px;
    margin: 50px auto 7px;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
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
      <Section>
        <h1><p>Practice Interviews</p></h1>
        <p>Explore and exam REAL Interviews!!</p>
        <p>__List Specializations and roles here.__</p>
        <StyledRow type="flex" justify="space-around">
          <Col span={6}>
            <FontAwesomeIcon icon={faHtml5} size="7x" color="#08c" />
            <p>HTML5</p>
          </Col>
          <Col span={6}>
            <FontAwesomeIcon icon={faJs} size="7x" color="#08c" />
            <p>JavaScript</p>
          </Col>
          <Col span={6}>
            <FontAwesomeIcon icon={faNode} size="7x" color="#08c" />
            <p>NodeJs</p>
          </Col>
          <Col span={6}>
            <FontAwesomeIcon icon={faJava} size="7x" color="#08c" />
            <p>Java</p>
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
    </>
  );
};

Home.propTypes = {
  backgrounds: PropTypes.object,
};

export default Home;
