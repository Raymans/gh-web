import PropTypes from 'prop-types';
import { Collapse, Descriptions, Tag } from 'antd';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import Moment from 'react-moment';
import AuthorBy from '../AuthorBy';
import React from 'react';
import useStore from '../../hooks/useStore';
import styled from 'styled-components';

const StyledDescription = styled.div`
  font-size: 20px;
  margin: 10px 0;
  white-space: pre-line;
`;

const InterviewDescription = ({
  interview,
  collapse
}) => {
  const { userId } = useStore();
  const isOwner = userId === interview.clientUser.id;
  const intl = useIntl();

  const withCollapse = (children) => {
    if (collapse) {
      return <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={intl.formatMessage({
          id: 'assessment.details',
          defaultMessage: 'Assessment Details'
        })} key="1">
          {children}
        </Collapse.Panel>
      </Collapse>;
    }
    return children;
  };

  return withCollapse(
    <Descriptions column={2}>
      {/*<Descriptions.Item*/}
      {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}*/}
      {/*>*/}
      {/*  {interview.specialization.name}*/}
      {/*</Descriptions.Item>*/}

      <Descriptions.Item
        span={2}
      >
        {isOwner && interview.visibility === 'PRIVATE' &&
        <Tag color="#ffc93c"><FormattedMessage id="assessment.tag.private"
                                               defaultMessage="private"/></Tag>
        }
      </Descriptions.Item>
      {/*<StyledInfoRow>*/}
      {/*  <div>{intl.formatMessage({ defaultMessage: 'Job Title: {jobTitle}' }, { jobTitle: interview.jobTitle })}</div>*/}
      {/*  <div className={'updated-time'}><FormattedMessage*/}
      {/*    defaultMessage="Updated on"/>: <Moment date={interview.lastModifiedDate}/></div>*/}
      {/*</StyledInfoRow>*/}
      <Descriptions.Item
        label={intl.formatMessage({ defaultMessage: 'Job Title' })}
      >
        {interview.jobTitle}
      </Descriptions.Item>
      <Descriptions.Item
        label={<FormattedMessage defaultMessage="Updated on"/>}
        style={{
          float: 'right',
          marginTop: '-14px'
        }}
        labelStyle={{ fontSize: '14px' }}
        contentStyle={{ fontSize: '14px' }}
      >
        <Moment date={interview.lastModifiedDate}/>
      </Descriptions.Item>
      <Descriptions.Item
        span={2}
      >
        <StyledDescription dangerouslySetInnerHTML={{ __html: interview.description }}/>
      </Descriptions.Item>
      <Descriptions.Item
        span={2}
      >
        <AuthorBy
          clientUser={interview.clientUser}
        />
      </Descriptions.Item>
    </Descriptions>);
};

export default InterviewDescription;

InterviewDescription.propTypes = {
  collapse: PropTypes.bool,
  interview: PropTypes.object.isRequired
};

InterviewDescription.defaultProps = {
  collapse: false,
  interview: {}
};
