/* eslint no-unused-vars: 0 */

import PropTypes from "prop-types";
import React from "react";

import { Row, Col } from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faNode, faJava, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';


const Home = props => {
  const {backgrounds,  theme} = props;
  return (
    <React.Fragment>
      <section style={{padding: "0px 50px"}} className="title">
        <h1><p>LANGUAGES</p></h1>
        <p>Try to explore any language you interest</p>
        <Row type="flex" justify="space-around" style={{"margin": "50px 60px"}}>
          <Col span={6}><FontAwesomeIcon icon={faHtml5} size="7x" color="#08c"/><p>HTML5</p></Col>
          <Col span={6}><FontAwesomeIcon icon={faJs} size="7x" color="#08c"/><p>JavaScript</p></Col>
          <Col span={6}><FontAwesomeIcon icon={faNode} size="7x" color="#08c"/><p>NodeJs</p></Col>
          <Col span={6}><FontAwesomeIcon icon={faJava} size="7x" color="#08c" spin={true}/><p>Java</p></Col>
        </Row>
      </section>
      <section style={{padding: "0px 50px", backgroundColor: theme.color.neutral.gray.a}} className="title">

        <Row type="flex" justify="space-around" style={{"margin": "50px 60px"}}>
          <Col span={12}>
            <h1><p>Building questions</p></h1>
            <p>Building your own questions for later use or share it</p>
          </Col>
          <Col span={12}>
            <section className="buildQuestions">

            </section>
          </Col>
        </Row>
      </section>

      <style jsx>{`
        h1{
          font-weight: 500;
          text-align: center;
          max-width: 300px;
          margin: 50px auto 7px;
          border-bottom: 1px solid #e8e8e8;
          padding-bottom: 10px;
        }
        .title p{
          text-align: center;
        }
        :global(.ant-col-6, .ant-col-12) {
          text-align: center;
        }
        .buildQuestions {
          height: 250px;
          background-image: url(${backgrounds.bq});
          background-size: cover;
        }
      `}
      </style>
    </React.Fragment>
  );
};

Home.propTypes = {
};

export default Home;
