/* eslint no-unused-vars: 0 */

import React from 'react';

import { Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { useTheme } from 'styled-components';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AnalysisImg from '../../images/Analysis.jpg';
import CreateAssessmentImg from '../../images/CreateAssessment.jpg';
import ShareAssessmentImg from '../../images/ShareAssessment.jpg';
import EnglishAssessmentImg from '../../images/EnglishAssessment.jpg';
import TechniqueAssessmentImg from '../../images/TechniqueAssessment.jpg';
import CreateAssessmentExample from '../../images/CreateAssessmentExample.png';
import ShareAssessmentExample from '../../images/ShareAssessmentExample.png';
import ReviewAssessmentExample from '../../images/ReviewAssessmentExample.png';
import useGetStarted from '../../hooks/useGetStarted';

const Section = styled.section`
  :nth-child(even) {
    background-color: hsla(180, 5%, 96%, .7)
  }

  padding: 0 50px;

  h1 {
    font-weight: 500;
    padding: 50px 0 10px;

    p {
      text-align: center;
      font-size: 40px;
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

  &.no-pic p {
    text-align: center;
  }

  .ant-col-6, .ant-col-12 {
    text-align: center;
  }
`;
const StyledRow = styled(Row)`
  padding: 50px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    div {
      max-width: 100%;
    }
  }
`;

const ImageSection = styled.section`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: ${(props) => props.position === 'right' ? '0 0 0 40px' : '0 40px 0 0'};
`;

const IconImage = styled.img`
  width: 300px;
  height: 235px;
  border-radius: 50%;

  &.big {
    width: 500px;
    height: 300px;
    border-radius: 9%;
  }

  @media (max-width: 768px) {
    &.big {
      width: 100%;
    }
  }
`;

const FeatureList = styled.ul`
  padding: 0;
  margin-left: 50px;
  display: inline-block;

  li {
    list-style-type: none;
    margin: 5px 0;
  }
`;

const IconDescription = ({
  icon,
  title,
  description,
  className
}) =>
  <Col style={{
    textAlign: 'center',
    marginTop: 10
  }}>
    {/*<FontAwesomeIcon icon={icon} size="7x"/>*/}
    <IconImage src={icon} alt="Analysis" className={className}/>
    <p style={{ paddingTop: '10px' }}>{title}</p>
    {description}
  </Col>;

const FeatureListItem = ({
  children
}) => {
  const theme = useTheme();
  return (
    <li style={{ textAlign: 'left' }}>
      <FontAwesomeIcon icon={faCheck} color={theme.color.brand.primary} style={{
        marginRight: 10
      }}/>
      <span>{children}</span>
    </li>);
};

const Home = (props) => {
  const { backgrounds } = props;
  const intl = useIntl();
  const theme = useTheme();
  const { step } = useGetStarted();
  return (
    <>
      <Section className="no-pic">
        <h1><p><FormattedMessage
          defaultMessage="GeekHub can help in many cases such as Technical Interviews, English learning, Study Group"
          values={{ br: <br/> }}/>
        </p></h1>
        <h2><p><FormattedMessage defaultMessage="GeekHub Templates"/></p></h2>
        <StyledRow type="flex" justify="space-around">
          <IconDescription icon={TechniqueAssessmentImg}
                           className="big"
                           title={intl.formatMessage({ defaultMessage: 'Technical Interviews' })}
                           description={
                             <FeatureList>
                               <FeatureListItem><FormattedMessage
                                 defaultMessage="JavaScript Assessment"/></FeatureListItem>
                               <FeatureListItem><FormattedMessage
                                 defaultMessage="Java Assessment"/></FeatureListItem>
                               <FeatureListItem><FormattedMessage
                                 defaultMessage="React Assessment"/></FeatureListItem>
                             </FeatureList>
                           }
          />
          <IconDescription icon={EnglishAssessmentImg}
                           className="big"
                           title={intl.formatMessage({ defaultMessage: 'English Assessment' })}
                           description={
                             <FeatureList>
                               <FeatureListItem><FormattedMessage
                                 defaultMessage="Basic English Assessment"/></FeatureListItem>
                               <FeatureListItem><FormattedMessage
                                 defaultMessage="Grammar Assessment"/></FeatureListItem>
                             </FeatureList>
                           }
          />
        </StyledRow>
      </Section>
      <Section className="no-pic">
        <h1><p><FormattedMessage defaultMessage="Most Speedy Assessments manage tools"/></p></h1>
        <StyledRow type="flex" justify="space-around">
          <IconDescription icon={CreateAssessmentImg}
                           title={intl.formatMessage({ defaultMessage: 'Create Assessment' })}
                           description={intl.formatMessage({ defaultMessage: 'Easy and speedy creating a your own Assessment.' })}
          />
          <IconDescription icon={ShareAssessmentImg}
                           title={intl.formatMessage({ defaultMessage: 'Share Assessment' })}
                           description={intl.formatMessage({ defaultMessage: 'Easy Share with any people to assess your Assessment ' })}
          />
          <IconDescription icon={AnalysisImg}
                           title={intl.formatMessage({ defaultMessage: 'Analysis Assessment Result' })}
                           description={intl.formatMessage({ defaultMessage: 'Analysis each Assessment Result into a clear view' })}
          />
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex">
          <Col span={8}>
            <h1><p><FormattedMessage defaultMessage="Create your assessment"/></p></h1>
            <p><FormattedMessage defaultMessage="Want to have your own assessments to let everyone see and test it? you can do that
              easily to build up your own questions for later use or share it"/></p>
            <p><FormattedMessage defaultMessage="Keep your assessment privately so you can share and decide who can see/test your
              interview"/></p>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                defaultMessage="Makes your Assessment as Public, Everyone can see and assess it"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Put your Assessment as Private, Only you can decide who can view and assess"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Time Count down"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Multiple Section Support, help you design grouping your questions"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Support Multiple question types, Short Answer, Multiple Answers, and coding question coming soon!"/></FeatureListItem>
            </FeatureList>
          </Col>
          <Col span={16}>
            <ImageSection position="right" image={CreateAssessmentExample}/>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={16}>
            <ImageSection position="left" image={ShareAssessmentExample}/>
          </Col>
          <Col span={8}>
            <h1><p><FormattedMessage defaultMessage="Share Assessment"/></p></h1>
            <p><FormattedMessage
              defaultMessage="Easily to share with anyone you want who assess your Assessments,
              or shares Assessment link directly to them via social media. You decide who can assess your Assessments"/>
            </p>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                defaultMessage="Invite candidate to assess via Email Notification"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Give your candidate Assessment Link or reach them via LinkIn/Facebook any Social Media you used"/></FeatureListItem>
            </FeatureList>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={8}>
            <h1><p><FormattedMessage defaultMessage="Analysis Assessment Result"/></p></h1>
            <p><FormattedMessage defaultMessage="You can easily see who tests your assessment and review summary of each result in a
              very clear view."/></p>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                defaultMessage="Makes your Assessment as Public, Everyone can see and assess it"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Put your Assessment as Private, Only you can decide who can view and assess"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Time Count down"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Multiple Section Support, help you design grouping your questions"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Support Multiple question types, Short Answer, Multiple Answers, and coding question coming soon!"/></FeatureListItem>
            </FeatureList>
          </Col>
          <Col span={16}>
            <ImageSection position="right" image={ReviewAssessmentExample}/>
          </Col>
        </StyledRow>
      </Section>
      <Section className="no-pic">
        <h1><p><FormattedMessage defaultMessage="Get Started right now!"/></p></h1>
        <p><FormattedMessage
          defaultMessage="Visit our GeekHub Template to do your first assessment, get you idea about how speedy to create an first Assessment by yourself."/>
        </p>
        <StyledRow type="flex" justify="space-around">
          <Col span={24} style={{ textAlign: 'center' }}>
            <h2><FormattedMessage defaultMessage="Choose a GeekHub Assessment to start."/></h2>
            <Button type={'primary'} onClick={() => navigate('/get-started')}>
              {
                step === 0 ?
                  <FormattedMessage defaultMessage={'Get Started'}/> :
                  <FormattedMessage defaultMessage={'Continue Get Started'}/>
              }
            </Button>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                defaultMessage="JavaScript Assessment"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="Java Assessment"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                defaultMessage="React Assessment"/></FeatureListItem>
            </FeatureList>
          </Col>
        </StyledRow>
      </Section>
      {/*<Section className="no-pic">*/}
      {/*  <h1><p><FormattedMessage defaultMessage="Top engineering roles come to you"/></p></h1>*/}
      {/*  <p><FormattedMessage defaultMessage="450+ top tech companies hire for their best engineering teams from GeekHub. Teams reach*/}
      {/*    out to you so you will never miss those hot opportunities!"/></p>*/}
      {/*  <StyledRow type="flex" justify="space-around">*/}
      {/*    <TopCompany />*/}
      {/*  </StyledRow>*/}
      {/*</Section>*/}
      {/*<Section className="no-pic">*/}
      {/*  <PlanAndPrice/>*/}
      {/*</Section>*/}
    </>
  );
};

Home.propTypes = {
  backgrounds: PropTypes.object
};

export default Home;
