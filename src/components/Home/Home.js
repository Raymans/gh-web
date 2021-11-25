/* eslint no-unused-vars: 0 */

import React from 'react';

import { Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { useTheme } from 'styled-components';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CreateAssessmentExample from '../../images/CreateAssessmentExample.png';
import ShareAssessmentExample from '../../images/ShareAssessmentExample.png';
import ReviewAssessmentExample from '../../images/ReviewAssessmentExample.png';
import EnglishAssessmentImg from '../../images/EnglishAssessment.jpg';
import TechniqueAssessmentImg from '../../images/TechniqueAssessment.jpg';
import AboutUsImg from '../../images/AboutUs.jpg';
import useGetStarted from '../../hooks/useGetStarted';
import Lottie from 'react-lottie';
import jsonAnalysis from '../../animation/AnalysisAssessment.json';
import jsonShare from '../../animation/ShareAssessment.json';
import jsonCreate from '../../animation/CreateAssessment.json';

const StyledHome = styled.div`
  background-color: white;
`;

const Section = styled.section`
  :nth-child(even) {
    background-color: hsla(180, 5%, 96%, .7)
  }

  padding: 0 150px;
  min-height: 500px;

  h1 {
    font-weight: 500;
    font-size: 36px;
    text-align: center;
    width: 100%;
  }

  h2 {
    text-align: center;
    border: 0;
    font-size: 32px;
    margin-top: 60px;
    width: 100%;
  }

  h3 {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const StyledSectionBlack = styled(Section)`
  background-color: black !important;
  color: white;
`;

const StyledLeftH2 = styled.h2`
  text-align: left !important;
  margin-top: 0 !important;
`;

const StyledLeftH2Blue = styled(StyledLeftH2)`
  color: ${(props) => props.theme.color.brand.primary};
`;

const StyledRow = styled(Row)`
  padding: 70px 0;
  justify-content: center;

  div {
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    div {
      max-width: 100%;
    }
  }
`;

const StyledImagesRow = styled(Row)`
  padding: 70px 0;
  justify-content: center;

  div {
    margin: 0 50px;
    max-width: 430px;
  }

  div.template {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    div {
      max-width: 100%;
      margin: 0;
    }
  }
`;

const ImageSection = styled.section`
  height: 400px;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const IconImage = styled.img`
  width: 300px;
  height: 235px;
  border-radius: 50%;
  margin: 10px 0 20px;

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
  margin: 0 40px;
  display: inline-block;

  li {
    list-style-type: none;
    margin: 5px 0;
    letter-spacing: 1px;
    text-align: left;
  }
`;

const SectionDesc = styled.p`
  font-size: 24px;
`;


const FeatureListItem = ({
  children
}) => {
  const theme = useTheme();
  return (
    <li>
      <FontAwesomeIcon icon={faCheck} color={theme.color.brand.primary} style={{
        marginRight: 10
      }}/>
      <span>{children}</span>
    </li>);
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Home = (props) => {
  const { backgrounds } = props;
  const intl = useIntl();
  const theme = useTheme();
  const { step } = useGetStarted();

  const IconDescription = ({
    icon,
    title,
    description,
    className,
    image
  }) =>
    <Col style={{
      textAlign: 'center',
      marginTop: 10
    }} className={className}>
      {/*<FontAwesomeIcon icon={icon} size="7x"/>*/}
      <h3 style={{ paddingTop: '10px' }}>{title}</h3>
      {
        !!image ? <IconImage src={icon} alt="Analysis" className={className}/> :
          <Lottie options={{ animationData: icon, ...defaultOptions }}
                  width={300}
                  height={240}
          />
      }
      <p>{description}</p>
    </Col>;

  return (
    <StyledHome>
      <Section>
        <StyledRow type="flex">
          <Col span={12} data-aos="fade-up-right">
            <StyledLeftH2><FormattedMessage id="home.about.us.title.2"
                                            defaultMessage="GeekHub - the best assessment platform for seeking talents"/></StyledLeftH2>
            <SectionDesc><FormattedMessage
              id="home.about.us.desc"
              defaultMessage="TBD"/>
            </SectionDesc>
          </Col>
          <Col span={12} data-aos="fade-in">
            <ImageSection position="right" image={AboutUsImg}/>
          </Col>
        </StyledRow>
      </Section>
      <Section className="no-pic">
        <StyledImagesRow type="flex" justify="space-around">
          <h1>
            <FormattedMessage
              id="home.template.title"
              defaultMessage="Our tool is perfectly suited for conducting technical interviews, online learning assessments and popup quiz"
            />
          </h1>
          {/*<h2><FormattedMessage id="home.template.title2" defaultMessage="GeekHub Templates"/></h2>*/}
          <IconDescription icon={TechniqueAssessmentImg}
                           className="big template"
                           title={intl.formatMessage({ defaultMessage: 'Technical Interviews' })}
                           image
                           description={
                             <FeatureList>
                               <FeatureListItem><FormattedMessage
                                 id="home.template.fundamentals"
                                 defaultMessage="Programming language fundamentals"/></FeatureListItem>
                               <FeatureListItem><FormattedMessage
                                 id="home.template.problem.solving"
                                 defaultMessage="Problem solving"/></FeatureListItem>
                               <FeatureListItem><FormattedMessage
                                 id="home.template.design.patterns"
                                 defaultMessage="Design patterns"/></FeatureListItem>
                             </FeatureList>
                           }
          />
          <IconDescription icon={EnglishAssessmentImg}
                           className="big template"
                           title={intl.formatMessage({
                             defaultMessage: 'Online Assessment',
                             id: 'home.template.online'
                           })}
                           image
                           description={
                             <FeatureList>
                               <FeatureListItem><FormattedMessage
                                 id="home.template.language.learning"
                                 defaultMessage="Language learning"/></FeatureListItem>
                               <FeatureListItem><FormattedMessage
                                 id="home.template.tutoring"
                                 defaultMessage="Tutoring"/></FeatureListItem>
                             </FeatureList>
                           }
          />
        </StyledImagesRow>
      </Section>
      <Section className="no-pic" data-aos="zoom-in">
        <StyledImagesRow type="flex" justify="space-around">
          <h1><FormattedMessage id="home.easy.steps"
                                defaultMessage="Easy Steps to Online Assessment"/></h1>
          <IconDescription icon={jsonCreate}
                           title={intl.formatMessage({
                             defaultMessage: 'Create Assessment',
                             id: 'home.easy.steps.create.title'
                           })}
                           description={intl.formatMessage({
                             defaultMessage: 'Instantly with our intuitive UI',
                             id: 'home.easy.steps.create.desc'
                           })}
          />
          <IconDescription icon={jsonShare}
                           title={intl.formatMessage({
                             defaultMessage: 'Share Assessment',
                             id: 'home.easy.steps.share.title'
                           })}
                           description={intl.formatMessage({
                             defaultMessage: 'With your candidate with a click of a button',
                             id: 'home.easy.steps.share.desc'
                           })}
          />
          <IconDescription icon={jsonAnalysis}
                           title={intl.formatMessage({
                             defaultMessage: 'Analyze Result',
                             id: 'home.easy.steps.analyze.title'
                           })}
                           description={intl.formatMessage({
                             defaultMessage: 'Assess candidate\'s result and visual comparison across the board.',
                             id: 'home.easy.steps.analyze.desc'
                           })}
          />
        </StyledImagesRow>
      </Section>
      <Section>
        <StyledRow type="flex">
          <Col span={12} data-aos="fade-up-right">
            <StyledLeftH2Blue><FormattedMessage id="home.create.title"
                                                defaultMessage="Create"/></StyledLeftH2Blue>
            <SectionDesc><FormattedMessage
              id="home.create.desc"
              defaultMessage="Start organizing your assessment with defined sections and questions. Compose your questions and answers with our easy-to-use User Interface. We also support a range of assessment options, including:"/>
            </SectionDesc>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                id="home.create.item.1"
                defaultMessage="Assessment visibility to control who can see your assessment"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.2"
                defaultMessage="Time bound assessment"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.3"
                defaultMessage="Group your questions by sections"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.4"
                defaultMessage="Support various question types"/></FeatureListItem>
            </FeatureList>
          </Col>
          <Col span={12} data-aos="fade-in">
            <ImageSection position="right" image={CreateAssessmentExample}/>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={12} data-aos="fade-in">
            <ImageSection position="left" image={ShareAssessmentExample}/>
          </Col>
          <Col span={12} data-aos="fade-up-left">
            <StyledLeftH2Blue><FormattedMessage id="home.share.title"
                                                defaultMessage="Share"/></StyledLeftH2Blue>
            <SectionDesc><FormattedMessage
              id="home.share.desc"
              defaultMessage="Share your assessment with anyone via email invitation or direct URL."/>
            </SectionDesc>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                id="home.share.item.1"
                defaultMessage="Invite candidate to assess via Email Notification"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.share.item.2"
                defaultMessage="Give your candidate Assessment Link or reach them via LinkIn/Facebook any Social Media you used"/></FeatureListItem>
            </FeatureList>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <StyledRow type="flex" justify="space-around">
          <Col span={12} data-aos="fade-up-right">
            <StyledLeftH2Blue><FormattedMessage
              id="home.analyze.title"
              defaultMessage="Analyze"/></StyledLeftH2Blue>
            <SectionDesc><FormattedMessage id="home.analyze.desc"
                                           defaultMessage="Visualize assessment results and make informed decisions"/>
            </SectionDesc>
            <FeatureList>
              <FeatureListItem>
                <FormattedMessage
                  id="home.analyze.item.1"
                  defaultMessage="View overall assessment score and at each question level"/>
              </FeatureListItem>
              <FeatureListItem>
                <FormattedMessage
                  id="home.analyze.item.2"
                  defaultMessage="View score breakdown by sections"/>
              </FeatureListItem>
              <FeatureListItem>
                <FormattedMessage
                  id="home.analyze.item.3"
                  defaultMessage="View assessment benchmark across candidates"/>
              </FeatureListItem>
            </FeatureList>
          </Col>
          <Col span={12} data-aos="fade-in">
            <ImageSection position="right" image={ReviewAssessmentExample}/>
          </Col>
        </StyledRow>
      </Section>
      <StyledSectionBlack className="no-pic">
        <StyledRow type="flex" justify="space-around" data-aos="zoom-in">
          <Col span={24} style={{ textAlign: 'center' }}>
            <h2><FormattedMessage id="home.getstarted.title" defaultMessage="Get Started for Free"/>
            </h2>
            <p><FormattedMessage
              id="home.getstarted.desc"
              defaultMessage="Click on Get Started to experience the entire online assessment lifecycle without needing to create an account."/>
            </p>
            <Button type={'primary'} onClick={() => navigate('/get-started')}>
              {
                step === 0 ?
                  <FormattedMessage id="home.getstarted.button" defaultMessage={'Get Started'}/> :
                  <FormattedMessage id="home.getstarted.continue"
                                    defaultMessage={'Continue Get Started'}/>
              }
            </Button>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                id="home.template.fundamentals"
                defaultMessage="Programming language fundamentals"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.template.problem.solving"
                defaultMessage="Problem solving"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.template.design.patterns"
                defaultMessage="Design patterns"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.template.language.learning"
                defaultMessage="Language learning"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.template.tutoring"
                defaultMessage="Tutoring"/></FeatureListItem>
            </FeatureList>
          </Col>
        </StyledRow>
      </StyledSectionBlack>
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
    </StyledHome>
  );
};

Home.propTypes = {
  backgrounds: PropTypes.object
};

export default Home;
