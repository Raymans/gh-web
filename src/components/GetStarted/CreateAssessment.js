import InterviewForm from '../Interviews/InterviewForm';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import GetStartedInformationBox from './GetStartedInformationBox';
import ConfirmModal from '../Organization/ConfirmModal';
import { Select, Spin } from 'antd';
import useApi from '../../hooks/useApi';
import { LoadingOutlined } from '@ant-design/icons';

const CreateAssessment = ({
  setStep,
  setAssessmentId
}) => {
  const intl = useIntl();
  const { getInterviews } = useApi();
  const [templateInterviews, setTemplateInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [okButtonDisabled, setOkButtonDisabled] = useState(true);
  const handlePublished = (interview) => {
    setAssessmentId(interview.id);
    setStep(1);
    navigate('/get-started');
  };
  useEffect(() => {
    getInterviews({ template: true })
      .then(({ results }) => {
        setTemplateInterviews(results);
        setLoading(false);
      });
  }, []);

  const onTemplateSelect = (template) => {
    setOkButtonDisabled(false);
  };
  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <ConfirmModal
          title={intl.formatMessage({
            id: 'assessment.template.select.title',
            defaultMessage: 'Choose a Template'
          })}
          submitButtonTitle={intl.formatMessage({
            id: 'general.button.select',
            defaultMessage: 'Select'
          })}
          showDirectly={true}
          closable={false}
          maskClosable={false}
          cancelButtonHidden={true}
          okButtonDisabled={okButtonDisabled}
        >
          <FormattedMessage id={'assessment.template.select.desc'}
                            defaultMessage={'Please select a template to let us populate Assessment content quickly for you'}/>
          <Select
            onChange={() => onTemplateSelect()}
            style={{
              width: '100%',
              padding: '10px 0'
            }}
          >
            {
              templateInterviews.map((templateInterview) => (
                <Select.Option key={templateInterview.id}
                               value={templateInterviews.id}
                >
                  {templateInterviews.title}
                </Select.Option>
              ))
            }
          </Select>
        </ConfirmModal>

        <GetStartedInformationBox
          title={intl.formatMessage({ defaultMessage: 'Get started - Create Assessment' })}>
          <FormattedMessage
            defaultMessage={'Learn how to create your own assessments! Multiple settings includes:'}/>
          <ul>
            <li>
              <FormattedMessage defaultMessage={'Set assess time period to your assessment.'}/>
            </li>
            <li>
              <FormattedMessage defaultMessage={'Public/Private Visibility of Assessment'}/>
            </li>
            <li>
              <FormattedMessage
                defaultMessage={'Show Assessment result and answers to your candidate right after they submit.'}/>
            </li>
            <li>
              <FormattedMessage defaultMessage={'Section ability to aggregate your questions'}/>
            </li>
            <li>
              <FormattedMessage defaultMessage={'Reorder your questions by Drag and Drop'}/>
            </li>
          </ul>
        </GetStartedInformationBox>
        <InterviewForm onPublished={handlePublished}/>
      </Spin>
    </>
  );
};

export default CreateAssessment;
