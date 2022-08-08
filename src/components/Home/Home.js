/* eslint no-unused-vars: 0 */

import React from 'react';

import { Carousel, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { useTheme } from 'styled-components';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CreateAssessmentExample from '../../images/CreateAssessmentExample.jpg';
import CreateAssessmentExample2 from '../../images/CreateAssessmentExample2.jpg';
import ShareAssessmentExample from '../../images/ShareAssessmentExample.jpg';
import ReviewAssessmentExample from '../../images/ReviewAssessmentExample.jpg';
import ReviewAssessmentExample2 from '../../images/ReviewAssessmentExample2.png';
import EnglishAssessmentImg from '../../images/EnglishAssessment.jpg';
import TechniqueAssessmentImg from '../../images/TechniqueAssessment.jpg';
import StepsBackgroundImg from '../../images/StepsBackground.jpg';

import useGetStarted from '../../hooks/useGetStarted';
import Lottie from 'react-lottie';
import jsonAnalysis from '../../animation/AnalysisAssessment.json';
import jsonShare from '../../animation/ShareAssessment.json';
import jsonCreate from '../../animation/CreateAssessment.json';
import VideoJS from '../VideoPlayer/VideoJS';
import GetStartedButton from './GetStartedButton';
import SectionTitle from './SectionTitle';
import SectionInnerTitle from './SectionInnerTitle';
import ActionButton from './ActionButton';
import IconDescription from './IconDescription';

const StyledHome = styled.div`
  background-color: white;
`;

const Section = styled.section`
  &.dark{
    color: white;
     div.ant-col {
      background-color: white;
    }
  }
  :nth-child(even) {
    border-top: #f2f0f0 2px solid;
    background-color: hsla(180, 5%, 96%, .7)
  }
  background: ${(props) => props.image? `url(${props.image}) round`: undefined};

  padding: 20px 150px;
  min-height: 600px;

  h1 {
    font-weight: 500;
    font-size: 31px;
    //text-align: center;
    width: 100%;
  }

  h2, h3 {
    margin: 0;
    padding: 0;
  }
  h2 {
    //text-align: center;
    font-size: 28px;
    //margin-top: 60px;
    width: 100%;
  }

  h3 {
    font-size: 23px;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const StyledSectionBlack = styled(Section)`
  background-color: black !important;
  color: white;
  display: flex;
  justify-content: center;
`;

const StyledLeftTitle = styled.h2`
  text-align: left !important;
  margin-top: 0 !important;
`;

const StyledLeftH2Blue = styled(StyledLeftTitle)`
  color: ${(props) => props.theme.color.brand.primary};
  border-image-slice: 1;
  border-image: linear-gradient(to right, rgb(16 136 174) 0%, rgba(240, 64, 149, 0) 50%);
  border-bottom: 2px solid;
`;

const StyledRow = styled(Row)`
  //padding: 70px 0;
  justify-content: center;
  flex-direction: ${(props) => props.reverse? 'row-reverse': 'row'};
  > div {
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    padding: 0;
    flex-direction: column;
     > div {
      max-width: 100%;
    }
  }
`;

const StyledCenterCol = styled(Col)`
  align-self: center;
`

const StyledImagesRow = styled(Row)`
  justify-content: center;
  row-gap: 30px !important;
  div {
    margin: 0 22px;
    max-width: 430px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    div {
      max-width: 100%;
      margin: 0;
    }
  }
`;

const StyledCarousel = styled(Carousel)`
  box-shadow: 0px 0px 20px #ced1d3;
  .slick-dots li button, .slick-dots li.slick-active button {
    background: ${(props) => props.theme.color.brand.primary};
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

const FeatureList = styled.ul`
  padding: 0;
  margin: 0 10px;
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

const Home = (props) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    techOrder: ['youtube'],
    sources: [{
      src: 'https://www.youtube.com/watch?v=feo59oZAbr0',
      type: 'video/youtube'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  const { backgrounds } = props;
  const intl = useIntl();
  const theme = useTheme();
  const { step } = useGetStarted();

  return (
    <StyledHome>
      <Section>
        <SectionTitle title={intl.formatMessage({ id: 'home.company.title' })}
                      subtitle={intl.formatMessage({ id: 'home.company.title.subtitle' })}/>
        <StyledRow type="flex">
          <Col span={12}>
            <SectionInnerTitle
              title={intl.formatMessage({ id: 'home.company.title1' }, { br: <br/> })}
              subtitle={intl.formatMessage({ id: 'home.company.title1.subtitle' })}
              align={'left'}/>
            <br/>
            <div>
              {/*<FormattedMessage id="home.company.desc"/>*/}
              透線上測試流程，
              <br/>快速篩選出最適合的人才，
              <br/>極大化時間應用價值。
            </div>
            <br/>
            <br/>
            <ActionButton danger onClick={()=> {document.querySelector('#steps').scrollIntoView({behavior: "smooth"})}}>
              LEARN MORE
            </ActionButton>
          </Col>
          <Col span={12} style={{width: 640, height: 360}}>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
          </Col>
        </StyledRow>
      </Section>
      <Section id="templates"  className="no-pic">
        <SectionTitle title={intl.formatMessage({ id: 'home.template.title' })}
                      subtitle={intl.formatMessage({ id: 'home.template.title.subtitle' })}/>
        <StyledImagesRow type="flex" justify="space-around">
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
        <ActionButton align={'center'} onClick={()=> navigate('/interviews?tab=explore')}>
          <FormattedMessage id={'home.template.discover'}/>
        </ActionButton>
      </Section>
      <Section id="steps" className="no-pic dark" image={StepsBackgroundImg}>
        <SectionTitle title={intl.formatMessage({ id: 'home.easy.steps' })}
                      subtitle={intl.formatMessage({id: 'home.easy.steps.subtitle'})}/>
        <StyledImagesRow type="flex" justify="space-around">
          <IconDescription icon={jsonCreate}
                           title={intl.formatMessage({
                             id: 'home.easy.steps.create.title'
                           })}
                           description={intl.formatMessage({
                             id: 'home.easy.steps.create.desc'
                           })}
          />
          <IconDescription icon={jsonShare}
                           title={intl.formatMessage({
                             id: 'home.easy.steps.share.title'
                           })}
                           description={intl.formatMessage({
                             id: 'home.easy.steps.share.desc'
                           })}
          />
          <IconDescription icon={jsonAnalysis}
                           title={intl.formatMessage({
                             id: 'home.easy.steps.analyze.title'
                           })}
                           description={intl.formatMessage({
                             id: 'home.easy.steps.analyze.desc'
                           })}
          />
        </StyledImagesRow>
      </Section>
      <Section>
        <SectionTitle title={intl.formatMessage({ id: 'home.create.title' })}
                      subtitle={intl.formatMessage({id: 'home.create.title.subtitle'})}/>
        <StyledRow type="flex">
          <StyledCenterCol span={12} data-aos="fade-up-right">
            <StyledLeftH2Blue><FormattedMessage id="home.create.title.inner"
                                                defaultMessage="Create"/></StyledLeftH2Blue>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                id="home.create.item.1"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.2"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.3"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.4"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.create.item.5"/></FeatureListItem>
            </FeatureList>
          </StyledCenterCol>
          <Col span={12} data-aos="fade-in">
            <StyledCarousel>
              <div>
                <ImageSection position="right" image={CreateAssessmentExample}/>
              </div>
              <div>
                <ImageSection position="right" image={CreateAssessmentExample2}/>
              </div>
            </StyledCarousel>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <SectionTitle title={intl.formatMessage({ id: 'home.share.title' })}
                      subtitle={intl.formatMessage({id: 'home.share.subtitle'})}/>
        <StyledRow type="flex" justify="space-around" reverse>
          <StyledCenterCol span={12} data-aos="fade-up-left">
            <StyledLeftH2Blue><FormattedMessage id="home.share.title.inner"
                                                defaultMessage="Share"/></StyledLeftH2Blue>
            <FeatureList>
              <FeatureListItem><FormattedMessage
                id="home.share.item.1"/></FeatureListItem>
              <FeatureListItem><FormattedMessage
                id="home.share.item.2"/></FeatureListItem>
            </FeatureList>
          </StyledCenterCol>
          <Col span={12} data-aos="fade-in">
            <ImageSection position="left" image={ShareAssessmentExample}/>
          </Col>
        </StyledRow>
      </Section>
      <Section>
        <SectionTitle title={intl.formatMessage({ id: 'home.analyze.title' })}
                      subtitle={intl.formatMessage({id: 'home.analyze.title.subtitle'})}/>
        <StyledRow type="flex" justify="space-around">
          <StyledCenterCol span={12} data-aos="fade-up-right">
            <StyledLeftH2Blue><FormattedMessage
              id="home.analyze.title.inner"
              defaultMessage="Analyze"/></StyledLeftH2Blue>
            <FeatureList>
              <FeatureListItem>
                <FormattedMessage
                  id="home.analyze.item.1"/>
              </FeatureListItem>
              <FeatureListItem>
                <FormattedMessage
                  id="home.analyze.item.2"/>
              </FeatureListItem>
              <FeatureListItem>
                <FormattedMessage
                  id="home.analyze.item.3"/>
              </FeatureListItem>
            </FeatureList>
          </StyledCenterCol>
          <Col span={12} data-aos="fade-in">
            <StyledCarousel>
              <div>
                <ImageSection position="right" image={ReviewAssessmentExample}/>
              </div>
              <div>
                <ImageSection position="right" image={ReviewAssessmentExample2}/>
              </div>
            </StyledCarousel>
          </Col>
        </StyledRow>
      </Section>
      <StyledSectionBlack className="no-pic">
        <StyledRow type="flex" justify="space-around" data-aos="zoom-in" style={{alignSelf: 'center'}}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h1><FormattedMessage id="home.getstarted.title" defaultMessage="Get Started for Free"/>
            </h1>
            <p>
              <FormattedMessage
              id="home.getstarted.desc"
            />
            </p>
            <div style={{margin: 20}}>
              <GetStartedButton/>
            </div>
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
