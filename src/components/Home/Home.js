/* eslint no-unused-vars: 0 */

import React from 'react'

import { Col, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHtml5, faJava, faJs, faNode } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
`
const StyledRow = styled(Row)`
  margin: 50px 60px;
`
const ImageSection = styled.section`
  height: 250px;
  background-image: url(${props => props.backgrounds.bq});
  background-size: cover;
`

const Home = props => {
  const {backgrounds} = props
  return (
    <React.Fragment>
      <Section>
        <h1><p>LANGUAGES</p></h1>
        <p>Try to explore any language you interest</p>
        <StyledRow type="flex" justify="space-around">
          <Col span={6}><FontAwesomeIcon icon={faHtml5} size="7x" color="#08c"/><p>HTML5</p></Col>
          <Col span={6}><FontAwesomeIcon icon={faJs} size="7x" color="#08c"/><p>JavaScript</p></Col>
          <Col span={6}><FontAwesomeIcon icon={faNode} size="7x" color="#08c"/><p>NodeJs</p></Col>
          <Col span={6}><FontAwesomeIcon icon={faJava} size="7x" color="#08c" spin={true}/><p>Java</p></Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={12}>
            <h1><p>Building questions</p></h1>
            <p>Building your own questions for later use or share it</p>
          </Col>
          <Col span={12}>
            <ImageSection backgrounds={backgrounds}/>
          </Col>
        </StyledRow>
      </Section>
    </React.Fragment>
  )
}

Home.propTypes = {
  backgrounds: PropTypes.object
}

export default Home
