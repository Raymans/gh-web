import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { graphql } from 'gatsby';
import Article from '../components/Article';
import CreateAssessment from '../components/GetStarted/CreateAssessment';
import Assessment from '../components/GetStarted/Assessment';
import GetStartedProgress from '../components/GetStarted/GetStartedProgress';
import useApi from '../hooks/useApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import useGetStarted from '../hooks/useGetStarted';
import ViewAssessmentResults from '../components/GetStarted/ViewAssessmentResults';
import ViewAssessmentResult from '../components/GetStarted/ViewAssessmentResult';

const GetStartedPage = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;
  const {
    isTokenValid,
    gsTokens,
    setTokens,
    step,
    setStep,
    assessmentId,
    assessmentSessionId,
    setAssessmentId,
    setAssessmentSessionId
  } = useGetStarted();
  const [loading, setLoading] = useState(true);
  const { getGuestUserToken } = useApi();
  useEffect(() => {

    if (isTokenValid) {
      setLoading(false);
      return;
    }
    getGuestUserToken()
      .then((gsTokens) => {
        setLoading(false);
        setTokens(gsTokens);
      });
  }, [gsTokens]);

  return (
    <>
      <Article>
        <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
          <GetStartedProgress step={step}/>
          {
            step === 0 &&
            <CreateAssessment setStep={setStep} setAssessmentId={setAssessmentId}/>
          }
          {
            step === 1 &&
            <Assessment setStep={setStep} setAssessmentId={setAssessmentId}
                        setAssessmentSessionId={setAssessmentSessionId} id={assessmentId}
                        sid={assessmentSessionId}/>
          }
          {
            step === 2 &&
            <ViewAssessmentResults assessmentId={assessmentId} setStep={setStep}/>
          }
          {
            step === 3 &&
            <ViewAssessmentResult id={assessmentId} sid={assessmentSessionId} setStep={setStep}/>

          }
        </Spin>
      </Article>
    </>
  );
};

GetStartedPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default GetStartedPage;
// eslint-disable-next-line no-undef
export const query = graphql`
  query GetStartedQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
